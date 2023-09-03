declare module 'stockfish' {
    class Stockfish {
      constructor();
      postMessage(command: string): void;
      onmessage: (event: { data: string }) => void;
    }
    export = Stockfish;
  }