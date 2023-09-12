import { Move } from 'chess.js';
import { calculateAccuracy, calculateWinChange } from '../Libs/Elevation';
import asyncPool from 'tiny-async-pool';
import _ from 'lodash';

export enum MoveClassification {
  good = 'good',
  best = 'best',
  miss = 'miss',
  blunder = 'blunder',
  great = 'great',
  excellent = 'excellent',
  mistake = 'mistake',
  inaccuracy = 'inaccuracy',
  briliant = 'briliant',
  book = 'book',
}

export interface ReviewedMove extends Move {
  best: ReviewedMoveOutput;
  playedMove: ReviewedMoveOutput;
  captured_pieces: any;
  index: number;
}
// https://lichess.org/page/accuracy

interface ReviewedMoveOutput extends BestMoveOutput {
  accuracy?: number;
  classification?: string;
}
export interface StockfishLine {
  winChance?: number;
  pv: string;
  depth: number;
  multipv: number;
  nodes: number;
  score: {
    value: number;
    type: string;
  };
}
export interface BestMoveOutput {
  position?: string;
  bestmove?: {
    bestmove: string;
    ponder: string;
  };
  lines: Array<StockfishLine>;
}

export interface ReviewStatus {
  done: boolean;
  total: number;
  current: number;
  depth: number;
}
export interface GameReview {
  moves: ReviewedMove[];
  summary: {
    accuracy: number[];
    mistake: number[];
    inaccuracy: number[];
    best: number[];
    good: number[];
    blunder: number[];
  };
}
export class StockfishEngine {
  private outputs: string[] = [];
  private data: BestMoveOutput = { lines: [] };
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
    this.data.bestmove = { bestmove, ponder };
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
    this.data.lines.push(result);
    return result;
  }

  async reset() {
    await this.sendUci('stop');
    this.data = { lines: [] };
    this.outputs = [];
  }
  async postEngineRun() {
    const mates = this.data.lines?.filter((x) => x.score.type === 'mate') || [];
    const normal = this.data.lines?.filter((x) => x.score.type === 'cp') || [];

    mates.sort((a, b) => b.score.value - a.score.value);
    normal.sort((a, b) => b.score.value - a.score.value);

    this.data.lines = [...mates, ...normal];
    const clonedData = { ...this.data };
    if (this.data) this.emitter('bestmove', clonedData);
    return clonedData;
  }

  setOption(key: string, value: string | number) {
    this.sendUci(`setoption name ${key} value ${value}\n`);
  }
  public quit() {
    this.sendUci('stop');
    this.sendUci('quit');
    this.engine.terminate();
    this.isTerminated = true;
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

  moveClassification(move: ReviewedMove, prevMove: ReviewedMove) {
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
      [-30, MoveClassification.mistake],
      [-20, MoveClassification.inaccuracy],
      [-10, MoveClassification.good],
      [-5, MoveClassification.excellent],
      [10, MoveClassification.best],
      [50, MoveClassification.great],
      [70, MoveClassification.briliant],
    ];

    if (move.best) {
      move.best.accuracy = accuracy;
      move.best.classification = classification;

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
      const diff = move.playedMove.accuracy - move.best.accuracy;

      move.diff = diff;
      for (const [diffV, cl] of mappings) {
        if (move.san === 'Nf6') {
          // console.log('debug', diff, diffV, diff <= diffV);
        }
        if (diff <= (diffV as number)) {
          move.playedMove.classification = cl as string;
          break;
        }
      }
      if (!move.playedMove.classification) {
        move.playedMove.classification = MoveClassification.book;
      }
    }
    return JSON.parse(JSON.stringify(move));
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
    const enginePool: StockfishEngine[] = [];
    const findBestMoveInForkedEngine = async (move: Move) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const self =
        enginePool.shift() || new StockfishEngine((_type, _data) => {});
      // self.setOption('UCI_AnalyseMode', 'true');
      const best = await self.findBestMove(move.before, depth);

      const playedMove = await self.searchMove(move.before, move.lan, depth);

      enginePool.push(self);
      return { best, ...move, playedMove };
    };
    for await (const result of asyncPool(
      navigator.hardwareConcurrency || 8,
      moveWithIndex,
      findBestMoveInForkedEngine
    )) {
      current++;

      analysysData.push(result as any);
      this.emitter('review-status', {
        total: moves.length,
        current,
        depth,
        move: result,
        elapsed: Date.now() - started,
        done: current >= moves.length,
      });
    }
    analysysData.sort((x, y) => x.index - y.index);
    const classificationMoves = analysysData.map((x, index) =>
      this.moveClassification(x, analysysData[index - 1])
    );
    for (const e of enginePool) {
      e.quit();
    }
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
