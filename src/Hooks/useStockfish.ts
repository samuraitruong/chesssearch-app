import { useEffect, useState } from 'react';
import { StockfishEngine } from './StockfishEngine';
import { ReviewStatus, GameReview } from '../Shared/Model';
import sortBy from 'lodash/sortBy';

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

          if (type === 'move-update') {
            // setReviewStatus(data);
            const lines = data.lines;
            const mateMoves = lines.filter((x) => x.score.type === 'mate');
            const cpMoves = lines.filter((x) => x.score.type === 'cp');
            sortBy(mateMoves, (x) => x.score.value);
            sortBy(cpMoves, (x) => x.score.value, 'desc');
            const bestLines = [...mateMoves, ...cpMoves]; //.splice(0, 5);
            console.log(bestLines);
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
