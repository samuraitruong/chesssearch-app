import { useEffect, useState } from 'react';
import { StockfishEngine } from './StockfishEngine';
import { ReviewStatus, GameReview } from '../Shared/Model';

export function useStockfish() {
  const [bestMoveResult, setBestMoveResult] = useState<any>();
  const [reviewData, setReviewData] = useState<GameReview>();
  const [engine, setEngine] = useState<StockfishEngine>();
  const [reviewStatus, setReviewStatus] = useState<ReviewStatus | undefined>(
    undefined
  );

  useEffect(() => {
    const initStockfishWorkerEngine = async () => {
      console.log('initial new engine');
      setEngine(
        new StockfishEngine((type, data) => {
          if (type === 'review') {
            setReviewData(data);
            console.log(data);
          }

          if (type === 'bestmove') {
            console.log(data);
            setBestMoveResult(data);
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
      console.log('kill the engine');
      if (engine) engine.quit();
    };
  }, [engine]);

  return {
    bestMoveResult,
    reviewData,
    engine,
    reviewStatus,
  };
}
