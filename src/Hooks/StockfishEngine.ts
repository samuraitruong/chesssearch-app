import { Move } from 'chess.js';
import { calculateAccuracy, calculateWinChange } from '../Libs/Elevation';
import asyncPool from 'tiny-async-pool';
import _ from 'lodash';

interface ReviewdMove extends Move {
  best: ReviewData;
  playedMove: ReviewData;

  index: number;
}
// https://lichess.org/page/accuracy

interface ReviewData extends EngineData {
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
export interface EngineData {
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
}
export interface GameReview {
  moves: ReviewdMove[];
  summary: {
    whiteAccuracy: number;
    blackAccuracy: number;
  };
}
export class StockfishEngine {
  private outputs: string[] = [];
  private data: EngineData = { lines: [] };
  private engine: Worker;
  constructor(
    private emitter: (
      type: 'review' | 'bestmove' | 'review-status',
      data: any
    ) => void
  ) {
    this.engine = new Worker('/sf/stockfish.js#stockfish.wasm');

    this.engine.onmessage = this.processMessage.bind(this);

    this.sendUci('uci');
    this.setOption('Use NNUE', 'true');
    // this.setOption('MultiPV', 2);
    this.setOption('UCI_AnalyseMode', 'false');

    this.setOption('Threads', 8);
    this.setOption('Clear', 'Hash');
    this.setOption('Hash', 128);
  }
  processMessage(event: MessageEvent) {
    const line = event.data;

    const excluded = [
      'info string classical evaluation enabled.',
      'info string NNUE evaluation enabled.',
    ];
    if (excluded.includes(line)) {
      return;
    }
    // console.log(line);
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
    this.data = { lines: [] };
    this.outputs = [];
  }
  async postEngineRun() {
    const mates = this.data.lines?.filter((x) => x.score.type === 'mate') || [];
    const normal = this.data.lines?.filter((x) => x.score.type === 'cp') || [];

    mates.sort((a, b) => b.score.value - a.score.value);
    normal.sort((a, b) => b.score.value - a.score.value);

    this.data.lines = [...mates, ...normal];
    if (this.data) this.emitter('bestmove', this.data);
    return this.data;
  }
  setOption(key: string, value: string | number) {
    this.sendUci(`setoption name ${key} value ${value}\n`);
  }
  public quit() {
    this.sendUci('stop');
    this.sendUci('quit');
    this.engine.terminate();
  }
  async waitForReady() {
    this.sendUci('isready');
    await this.waitFor('readyok');
  }
  async findBestMove(position: string, depth = 18) {
    const start = Date.now();
    this.reset();
    this.sendUci('stop');
    await this.waitForReady();
    this.setOption('UCI_AnalyseMode', 'false');
    this.data.position = position;
    this.sendUci('ucinewgame');
    this.sendUci('position fen ' + position);
    this.sendUci('go depth ' + depth);
    await this.waitFor('bestmove');
    console.log('bestmove found in %d ms', Date.now() - start);
    return this.postEngineRun();
  }

  async searchMove(position: string, move: string, depth = 18) {
    const start = Date.now();
    this.sendUci('stop');
    this.reset();
    await this.waitForReady();
    this.data.position = position;
    this.sendUci('ucinewgame');
    this.sendUci('position fen ' + position);
    this.sendUci(`go infinity searchmoves ${move}`);
    await this.waitForDepth(depth);
    this.sendUci('stop');
    console.log('bestmove found in %d ms', Date.now() - start);
    return this.postEngineRun();
  }

  moveClassification(move: ReviewdMove, prevMove: ReviewdMove) {
    let classification = 'book';
    let accuracy = 100;

    if (prevMove) {
      const bestMoveLine = move.playedMove.lines?.[0]; // actual move
      const bestPreviousMoveLine = prevMove.playedMove.lines?.[0]; // actual move
      if (bestMoveLine?.score)
        accuracy =
          103.1668 *
            Math.exp(
              -0.04354 *
                ((bestPreviousMoveLine?.winChance || 0) -
                  (bestMoveLine?.winChance || 0))
            ) -
          3.1669;

      if (accuracy < 99) {
        classification = 'great';
      }
      if (accuracy < 95) {
        classification = 'excellent';
      }

      if (accuracy < 80) {
        classification = 'good';
      }

      if (accuracy < 70) {
        classification = 'inaccuracy';
      }
      if (accuracy < 50) {
        classification = 'mistake';
      }

      if (accuracy < 30) {
        classification = 'blunder';
      }
    }
    // if (bestMoveLine) {
    //   const { bestmove } = move.review.bestmove.bestmove;
    //   if (yourMove) {
    //     const diff = yourMove.score.value - bestMoveLine.score.value;

    //     if (diff < -20) classification = 'excellent';
    //     if (diff < -50) classification = 'good';
    //     if (diff < -100) classification = 'inaccuracy';
    //     if (diff < -300) classification = 'mistake';
    //     if (diff < -400) classification = 'blunder';

    //     console.log('diff', diff, move.lan, move.san, classification);
    //   }

    //   move.review.bestElo = bestMoveLine.score.value;
    //   move.review.yourElo = yourMove?.score.value;

    //   if (bestmove === move.lan) {
    //     classification = 'best';
    //   }
    // }
    if (move.best) {
      move.best.accuracy = accuracy;
      move.best.classification = classification;
      move.playedMove.accuracy = calculateAccuracy(
        move.best.lines[0]?.winChance || 0,
        move.playedMove.lines[0]?.winChance || 0
      );
    }
    return move;
  }

  async gameReview(moves: Move[], depth = 18) {
    const moveWithIndex = moves.map((x, index) => ({ ...x, index }));
    //  loop throught all the moves and find the bestmove
    this.sendUci('stop');
    // this.setOption('UCI_AnalyseMode', 'true');
    const analysysData: ReviewdMove[] = [];
    let current = 0;
    const started = Date.now();
    this.emitter('review-status', {
      total: moves.length,
      current: 0,
      move: null,
      elapsed: 0,
      done: false,
    });
    const enginePool: StockfishEngine[] = [];
    const findBestMoveInForkedEngine = async (move: Move) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const self =
        enginePool.pop() || new StockfishEngine((_type, _data) => {});
      self.setOption('UCI_AnalyseMode', 'true');
      const best = await self.findBestMove(move.before, depth);
      // console.log(move.before + ' moves ' + move.lan);
      const playedMove = await self.searchMove(move.before, move.lan, depth);

      enginePool.push(self);
      return { best, ...move, playedMove };
    };
    for await (const result of asyncPool(
      12,
      moveWithIndex,
      findBestMoveInForkedEngine
    )) {
      current++;

      analysysData.push(result as any);
      this.emitter('review-status', {
        total: moves.length,
        current,
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
    classificationMoves.sort((a, b) => a.index - b.index);
    const reviewedData = {
      moves: classificationMoves,
      summary: {
        whiteAccuracy: _.meanBy(whiteMoves, (x) => x.playedMove.accuracy),
        blackAccuracy: _.meanBy(blackMoves, (x) => x.playedMove.accuracy),
      },
    };
    this.emitter('review', reviewedData);
  }
}
