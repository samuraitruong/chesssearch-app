export interface EngineData {
  position?: string;
  bestmove?: {
    bestmove: string;
    ponder: string;
  };
  lines?: Array<{
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
  private isReady = false;
  private engine: Worker;
  constructor(private emitter: (data: EngineData) => void) {
    this.engine = new Worker('/sf/stockfish.js#stockfish.wasm');

    this.engine.onmessage = this.processMessage.bind(this);

    this.sendUci('uci');
    this.setOption('Use NNUE', 'true');
    this.setOption('MultiPV', 2);
  }
  processMessage(event: MessageEvent) {
    const line = event.data;
    if (line === 'uciok') {
      this.isReady = true;
    }
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
    if (this.data) this.emitter(this.data);
  }
  setOption(key: string, value: string | number) {
    this.sendUci(`setoption name ${key} value ${value}\n`);
  }
  public quit() {
    this.sendUci('stop');
    this.sendUci('quit');
  }
  async findBestMove(position: string, depth = 18) {
    this.reset();
    this.sendUci('stop');
    this.data.position = position;
    this.sendUci('ucinewgame');
    this.sendUci('position fen ' + position);
    this.sendUci('go depth ' + depth);
    await this.waitFor('bestmove');
    this.emit();
  }
}
