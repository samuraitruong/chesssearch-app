import { useEffect, useState } from 'react';
// import Stockfish from 'stockfish/src/stockfish-nnue-16.js'
// import Stockfish from './stockfish-nnue-16.wasm'
export function useStockfish() {
  const [fen, findBestMove] = useState();
  if (fen) {
    console.log(fen);
  }
  // const stockfish = Stockfish();
  // const sendCommand = (command) => {
  //   stockfish.postMessage(command);
  // };

  // stockfish.onmessage = (event) => {
  //   console.log(event.data);
  //   // Handle Stockfish responses here
  // };

  // // Start Stockfish
  // sendCommand('uci');
  // sendCommand('isready');
  // sendCommand('ucinewgame');
  // useEffect(() => {
  //     sendCommand(`position fen ${fen}`);
  //     sendCommand('go depth 15');
  //     console.log('sending command to stockfish', fen)
  // }, [fen])
  return {
    fen,
    findBestMove,
  };
}
