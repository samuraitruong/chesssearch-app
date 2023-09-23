import { Move } from 'chess.js';
import {
  calculateAccuracy,
  calculateWinChange,
  estimatePlayPerfomance,
} from '../Shared/Elevation';
import asyncPool from 'tiny-async-pool';
import _ from 'lodash';
import { MoveClassification } from '../Shared/Constants';
import { BestMoveOutput, ReviewedMove } from '../Shared/Model';
import { advanceCompareReview, reviewMoveLine } from '../Shared/Game';
import { sortStockfishLine } from '../Shared/Utils';

export class StockfishEngine {
  private outputs: string[] = [];
  private enginePool: StockfishEngine[] = [];
  private data: BestMoveOutput = {
    lines: [],
    bestmove: '',
    bestLine: undefined,
    ponder: '',
  };
  private engine: Worker;
  private isTerminated = false;
  constructor(
    private emitter: (
      type: 'review' | 'bestmove' | 'review-status',
      data: any
    ) => void
  ) {
    this.engine = this.initEngine();
  }

  private initEngine() {
    this.engine = new Worker('/sf/stockfish.js#stockfish.wasm');
    this.isTerminated = false;
    this.engine.onmessage = this.processMessage.bind(this);

    this.sendUci('uci');
    this.setOption('Use NNUE', 'true');
    // this.setOption('MultiPV', 2);
    this.setOption('UCI_AnalyseMode', 'false');

    this.setOption('Threads', 8);
    this.setOption('Clear', 'Hash');
    this.setOption('Hash', 128);
    return this.engine;
  }

  processMessage(event: MessageEvent) {
    const line = event.data;
    // console.log(line);

    const excluded = [
      'info string classical evaluation enabled.',
      'info string NNUE evaluation enabled.',
    ];
    if (excluded.includes(line)) {
      return;
    }
    // if (line.includes('currmovenumber')) {
    //   console.log(line);
    // }
    this.outputs.push(line);
    this.parseBestMove(line);
    this.parseInfoLine(line);
  }
  async waitFor(event: string, timeout = 10000) {
    let t = 0;
    while (t < timeout) {
      if (this.outputs.some((x) => x.includes(event))) {
        return true;
      }
      await new Promise((r) => setTimeout(r, 100));
      t += 100;
    }
    return false;
  }

  async waitForDepth(depth: number, timeout = 10000) {
    let t = 0;
    while (t < timeout) {
      if (this.data?.lines?.some((x) => x.depth === depth)) {
        return true;
      }
      await new Promise((r) => setTimeout(r, 100));
      t += 100;
    }
    return false;
  }

  sendUci(command: string) {
    if (this.isTerminated) {
      this.initEngine();
    }

    // console.log('command "%s"', command);
    this.engine.postMessage(command);
  }
  private parseBestMove(line: string) {
    if (!line.startsWith('bestmove')) {
      return null;
    }
    const [, bestmove, , ponder] = line.split(' ');
    this.data.bestmove = bestmove;
    this.data.ponder = ponder;
  }

  private parseInfoLine(infoLine: string) {
    if (!infoLine.startsWith('info') || infoLine.includes('currmovenumber')) {
      return null;
    }

    const parts = infoLine.split(' ');

    const result = {
      winChance: 0,
      depth: parseInt(parts[2], 10),
      seldepth: parseInt(parts[4], 10),
      multipv: parseInt(parts[6], 10),
      score: {
        type: parts[8],
        value: parseInt(parts[9], 10),
      },
      nodes: parseInt(parts[11], 10),
      nps: parseInt(parts[13], 10),
      time: parseInt(parts[15], 10),
      pv: parts.slice(parts.indexOf('pv') + 1).join(' '),
      info: infoLine,
    };
    this.data.lines = this.data.lines || [];
    if (result.score.type === 'cp') {
      result.winChance = calculateWinChange(result.score.value);
    }

    if (result.score.type === 'mate') {
      if (result.score.value < 0) {
        result.winChance = 0;
      } else result.winChance = 100;
    }

    this.data.lines.push(result);
    return result;
  }

  async reset() {
    await this.sendUci('stop');
    this.data = { lines: [], bestmove: '', ponder: '', bestLine: undefined };
    this.outputs = [];
  }
  async postEngineRun(): Promise<BestMoveOutput> {
    const mates = this.data.lines?.filter((x) => x.score.type === 'mate') || [];
    const normal = this.data.lines?.filter((x) => x.score.type === 'cp') || [];

    mates.sort(sortStockfishLine);
    normal.sort(sortStockfishLine);

    this.data.lines = [...mates, ...normal];

    // analyse the best move line
    if (this.data.bestmove !== '(none)') {
      this.data.bestLine = reviewMoveLine(
        this.data.position || '',
        this.data.lines[0]
      );
    } else {
      // checkmated
      this.data.lines.push({
        winChance: 0,
        score: {
          type: 'mate',
          value: 0,
        },
        pv: '(none)',
      } as any);
    }

    const clonedData = { ...this.data };
    if (this.data) this.emitter('bestmove', clonedData);
    return clonedData;
  }

  setOption(key: string, value: string | number) {
    this.sendUci(`setoption name ${key} value ${value}\n`);
  }
  public quit() {
    const stopEngine = (e: StockfishEngine) => {
      e.sendUci('stop');
      e.sendUci('quit');
      e.engine.terminate();
      e.isTerminated = true;
      console.log('stop engines');
    };
    stopEngine(this);
    while (this.enginePool.length > 0) {
      const poolEngine = this.enginePool.pop();
      if (poolEngine) stopEngine(poolEngine);
    }
  }
  async waitForReady() {
    this.sendUci('isready');
    await this.waitFor('readyok');
  }

  async findBestMove(position: string, depth = 18) {
    const start = Date.now();
    await this.reset();
    await this.waitForReady();
    this.setOption('UCI_AnalyseMode', 'false');
    this.data.position = position;
    this.sendUci('ucinewgame');
    this.sendUci('position fen ' + position);
    this.sendUci('go depth ' + depth);
    await this.waitFor('bestmove');
    console.log(
      'findBestMove found in %d ms depth=%s',
      Date.now() - start,
      depth
    );
    return this.postEngineRun();
  }

  async searchMove(position: string, move: string, depth = 18) {
    const start = Date.now();
    await this.reset();
    await this.waitForReady();
    this.data.position = position;
    this.sendUci('ucinewgame');
    this.sendUci('position fen ' + position);
    this.sendUci(`go depth ${depth} searchmoves ${move}`);
    await this.waitFor('bestmove');
    this.sendUci('stop');
    console.log('searchMovefound in %d ms depth=%s', Date.now() - start, depth);
    return this.postEngineRun();
  }

  simpleClassificationByAccuracy(move: ReviewedMove, prevMove: ReviewedMove) {
    const classification = 'book';
    let accuracy = 100;

    if (prevMove) {
      const currentPlayedMove = move.best.lines?.[0]; // actual move
      const oppomentPlayedMove = prevMove.best.lines?.[0]; // actual move
      if (currentPlayedMove?.score)
        accuracy = calculateAccuracy(
          oppomentPlayedMove?.winChance || 0,
          currentPlayedMove?.winChance || 0
        );
    }

    const mappings = [
      [-40, MoveClassification.blunder],
      [-20, MoveClassification.mistake],
      [-5, MoveClassification.inaccuracy],
      [0, MoveClassification.good],
      [10, MoveClassification.excellent],
      // [10, MoveClassification.best],
      [20, MoveClassification.great],
      [30, MoveClassification.briliant],
    ];

    if (move.best) {
      move.best.accuracy = accuracy;
      move.best.classification = classification as MoveClassification;

      move.playedMove.accuracy = calculateAccuracy(
        move.best.lines[0]?.winChance || 0,
        move.playedMove.lines[0]?.winChance || 0
      );

      // if (move.color === 'b') {
      //   const currentPlayedMove = move.best.lines?.[0]; // actual move
      //   const oppomentPlayedMove = prevMove.best.lines?.[0]; // actual move
      //   move.best.accuracy = calculateAccuracy(
      //     100 - (oppomentPlayedMove?.winChance || 0),
      //     100 - (currentPlayedMove?.winChance || 0)
      //   );

      //   move.playedMove.accuracy = calculateAccuracy(
      //     100 - (move.best.lines[0]?.winChance || 0),
      //     100 - (move.playedMove.lines[0]?.winChance || 0)
      //   );
      // }
      //  const diff = move.playedMove.accuracy - move.best.accuracy;
      const winChanceDiff =
        (move.playedMove.lines[0]?.winChance || 0) -
        (move.best.lines[0]?.winChance || 0);

      // move.winChanceDiff = winChanceDiff;
      for (const [diffV, cl] of mappings) {
        if (winChanceDiff <= (diffV as number)) {
          move.playedMove.classification = cl as MoveClassification;
          break;
        }
      }
      if (
        move.playedMove.bestmove === move.best.bestmove &&
        ![MoveClassification.great, MoveClassification.briliant].includes(
          move.playedMove.classification
        )
      ) {
        move.playedMove.classification = MoveClassification.best;
      }

      // if (!move.playedMove.classification) {
      //   move.playedMove.classification = MoveClassification.book;
      // }
      // if (move.playedMove?.classification === MoveClassification.mistake) {
      //   if (
      //     move &&
      //     move.best?.bestLine?.marterial &&
      //     move.playedMove?.bestLine?.marterial &&
      //     move.playedMove?.bestLine?.marterial > 0 &&
      //     move.playedMove?.bestLine?.marterial < move.best?.bestLine?.marterial
      //   ) {
      //     move.playedMove.classification = MoveClassification.miss;
      //   }
      // }
      // if (
      //   prevMove &&
      //   prevMove.playedMove?.classification === MoveClassification.mistake &&
      //   move.playedMove?.classification === MoveClassification.mistake
      // ) {
      //   move.playedMove.classification = MoveClassification.miss;
      // }
    }
    return { ...move };
  }

  async reviewGame(moves: Move[], depth = 18) {
    const moveWithIndex = moves.map((x, index) => ({ ...x, index }));
    this.sendUci('stop');
    // this.setOption('UCI_AnalyseMode', 'true');
    const analysysData: ReviewedMove[] = [];
    let current = 0;
    const started = Date.now();
    this.emitter('review-status', {
      total: moves.length,
      current: 0,
      move: null,
      elapsed: 0,
      depth,
      done: false,
    });

    // const findBestMoveInForkedEngineSingle = async (move: Move) => {
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   const self =
    //     enginePool.shift() || new StockfishEngine((_type, _data) => {});
    //   await self.reset();
    //   self.setOption('UCI_AnalyseMode', 'true');
    //   const stopDepth = depth + 1;
    //   // await self.findBestMove(move.before, stopDepth);
    //   await self.sendUci('position fen ' + move.before);
    //   await self.sendUci('go infinity');
    //   await self.waitForDepth(stopDepth);
    //   //console.log('stop the engine search now');
    //   await self.sendUci('stop');
    //   await self.waitFor('bestmove');
    //   const outData = await self.postEngineRun();
    //   const bestLines = outData.lines.filter(
    //     (x) => x.depth <= depth && x.pv.startsWith(outData.bestmove)
    //   );

    //   const playedLines = outData.lines.filter(
    //     (x) => x.depth <= depth && x.pv.startsWith(move.lan)
    //   );

    //   enginePool.push(self);
    //   return {
    //     x: outData.lines,
    //     best: { ...outData, lines: bestLines },
    //     ...move,
    //     playedMove: { ...outData, lines: playedLines, bestmove: move.lan },
    //   };
    // };

    const findBestMoveInForkedEngine = async (move: Move) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const executeEngine =
        this.enginePool.shift() || new StockfishEngine((_type, _data) => {});
      // self.setOption('UCI_AnalyseMode', 'true');
      const best = await executeEngine.findBestMove(move.before, depth);

      const playedMove = await executeEngine.searchMove(
        move.before,
        move.lan,
        depth
      );

      this.enginePool.push(executeEngine);
      return { best, ...move, playedMove } as ReviewedMove;
    };
    const start = Date.now();
    for await (const result of asyncPool(
      navigator.hardwareConcurrency || 8,
      moveWithIndex,
      findBestMoveInForkedEngine
    )) {
      current++;

      analysysData.push(result);
      this.emitter('review-status', {
        total: moves.length,
        current,
        depth,
        move: result,
        elapsed: Date.now() - started,
        done: current >= moves.length,
      });
    }

    console.log('Review took %d ms', Date.now() - start);
    analysysData.sort((x, y) => x.index - y.index);
    let classificationMoves = analysysData.map((x, index) =>
      this.simpleClassificationByAccuracy(x, analysysData[index - 1])
    );
    classificationMoves = classificationMoves.map((move, index) =>
      advanceCompareReview(move, classificationMoves[index - 1])
    );

    const whiteMoves = analysysData.filter((x) => x.color === 'w');
    const blackMoves = analysysData.filter((x) => x.color === 'b');

    const countMove = (e: ReviewedMove[], classification: string) => {
      return _.filter(e, (x) => x.playedMove.classification === classification)
        .length;
    };
    classificationMoves.sort((a, b) => a.index - b.index);
    const reviewedData = {
      moves: classificationMoves,
      summary: {
        elo: [
          estimatePlayPerfomance(whiteMoves.map((x) => x.playedMove.lines[0])),
          estimatePlayPerfomance(blackMoves.map((x) => x.playedMove.lines[0])),
        ],
        accuracy: [
          _.meanBy(whiteMoves, (x) => x.playedMove.accuracy),
          _.meanBy(blackMoves, (x) => x.playedMove.accuracy),
        ],
        ...Object.values(MoveClassification).reduce(
          (acc, key) => ({
            ...acc,
            [key]: [countMove(whiteMoves, key), countMove(blackMoves, key)],
          }),
          {}
        ),
      },
    };
    this.emitter('review', reviewedData);
  }
}
