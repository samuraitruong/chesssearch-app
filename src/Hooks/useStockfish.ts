import { useEffect, useState } from 'react';
import { ReviewStatus, StockfishEngine } from './StockfishEngine';

export function useStockfish() {
  const [gameData, setGameData] = useState<any>();
  const [reviewData, setReviewData] = useState<any[]>([]);
  const [engine, setEngine] = useState<StockfishEngine>();
  const [reviewStatus, setReviewStatus] = useState<ReviewStatus | undefined>(
    undefined
  );

  useEffect(() => {
    const initStockfishWorkerEngine = async () => {
      setEngine(
        new StockfishEngine((type, data) => {
          if (type === 'review') {
            setReviewData(data);
            console.log(data);
          }

          if (type === 'bestmove') {
            console.log(data);
            setGameData(data);
          }
          if (type === 'review-status') {
            setReviewStatus(data);
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
    reviewStatus,
  };
}
