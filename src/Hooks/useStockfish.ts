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
      console.log('Start new stockfish engine worker');
      setEngine(
        new StockfishEngine((type, data) => {
          if (type === 'review') {
            setReviewData(data);
          }

          if (type === 'bestmove') {
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
      console.log('Clean up stockfish engine after use');
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
