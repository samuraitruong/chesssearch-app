import { useEffect, useState } from 'react';
// import init from '../assets/stockfish-nnue-16.wasm?init';
// import '../assets/stockfish-nnue-16.js';
import { StockfishEngine } from './StockfishEngine';

export function useStockfish() {
  const [gameData, setGameData] = useState<any>();
  const [engine, setEngine] = useState<StockfishEngine>();

  useEffect(() => {
    const initStockfishWorkerEngine = async () => {
      // const stockFishEngine = await (window as unknown as any).Stockfish();
      setEngine(
        new StockfishEngine((data) => {
          setGameData(data);
        })
      );
    };
    if (!engine) {
      initStockfishWorkerEngine();
    }
    return () => {
      if (engine) engine.quit();
    };
  }, [engine]);

  return {
    gameData,
    engine,
  };
}
