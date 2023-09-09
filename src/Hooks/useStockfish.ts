import { useEffect, useState } from 'react';
import { StockfishEngine } from './StockfishEngine';

export function useStockfish() {
  const [gameData, setGameData] = useState<any>();
  const [reviewData, setReviewData] = useState<any[]>([]);
  const [engine, setEngine] = useState<StockfishEngine>();

  useEffect(() => {
    const initStockfishWorkerEngine = async () => {
      // const stockFishEngine = await (window as unknown as any).Stockfish();
      setEngine(
        new StockfishEngine((type, data) => {
          if (type === 'review') {
            setReviewData(data);
            console.log(data);
          }

          if (type === 'bestmove') {
            setGameData(data);
          }
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
    reviewData,
    engine,
  };
}
