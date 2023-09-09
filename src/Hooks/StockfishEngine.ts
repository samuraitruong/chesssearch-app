import { Move } from 'chess.js';
import { calculateWinChange } from '../Libs/Elevation';
interface ReviewdMove extends Move {
  review: ReviewData;
}
// https://lichess.org/page/accuracy
interface ReviewData extends EngineData {
  accuracy?: number;
  classification?: string;
}
export interface EngineData {
  position?: string;
  bestmove?: {
    bestmove: string;
    ponder: string;
  };
  lines?: Array<{
    winChance?: number;
    pv: string;
    depth: number;
    multipv: number;
    nodes: number;
    score: {
      value: number;
    };
  }>;
}
export class StockfishEngine {
  private outputs: string[] = [];
  private data: EngineData = { lines: [] };
  private engine: Worker;
  constructor(
    private emitter: (type: 'review' | 'bestmove', data: any) => void
  ) {
    this.engine = new Worker('/sf/stockfish.js#stockfish.wasm');

    this.engine.onmessage = this.processMessage.bind(this);

    this.sendUci('uci');
    this.setOption('Use NNUE', 'true');
    // this.setOption('MultiPV', 2);
    this.setOption('Threads', 5);
    // this.setOption('Clear', 'Hash');
    // this.setOption('Hash', 128);
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
  async emit() {
    if (this.data.lines) {
      this.data.lines.sort((a, b) => b.score.value - a.score.value);
    }
    if (this.data) this.emitter('bestmove', this.data);
  }
  setOption(key: string, value: string | number) {
    this.sendUci(`setoption name ${key} value ${value}\n`);
  }
  public quit() {
    this.sendUci('stop');
    this.sendUci('quit');
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
    this.emit();
  }

  moveClassification(move: ReviewdMove, prevMove: ReviewdMove) {
    let classification = 'book';
    let accuracy = 100;

    if (prevMove) {
      const bestMoveLine = move.review.lines?.[0];
      const bestPreviousMoveLine = prevMove.review.lines?.[0];

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
    move.review.accuracy = accuracy;
    move.review.classification = classification;
    return move;
  }

  async gameReview(moves: Move[], depth = 12) {
    //  loop throught all the moves and find the bestmove
    this.sendUci('stop');
    this.setOption('UCI_AnalyseMode', 'true');
    const analysysData: any[] = [];
    for (const move of moves) {
      this.outputs = [];
      //this.sendUci(`position fen ${move.before} moves ${move.lan}`);
      this.sendUci(`position fen ${move.before}`);
      this.sendUci('go depth ' + depth);
      await this.waitFor('bestmove');
      if (this.data.lines) {
        this.data.lines.sort((a, b) => b.score.value - a.score.value);
      }
      analysysData.push({ review: { ...this.data }, ...move });
      // console.log('reviewing move ', move.san);
      this.data.lines = [];
    }
    const classificationMoves = analysysData.map((x, index) =>
      this.moveClassification(x, analysysData[index - 1])
    );
    this.emitter('review', classificationMoves);
  }
}
