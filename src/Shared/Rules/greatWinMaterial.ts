import { MoveClassification } from '../Constants';
import { PieceCaptureAccumulate, ReviewedMove } from '../Model';
/**
 * This to review line when we win material with piece that capture Queen
 * @param input
 * @returns
 */
export function greatWinMaterial(input: ReviewedMove) {
  // case of forcemate

  const { best, playedMove, color } = input;
  if (best.bestLine && playedMove.bestLine) {
    const pointAcc = (
      playedMove.bestLine.moves[playedMove.bestLine.moves.length - 1] as any
    ).captured_pieces as PieceCaptureAccumulate;

    const bestPointAcc = (
      best.bestLine.moves[best.bestLine.moves.length - 1] as any
    ).captured_pieces as PieceCaptureAccumulate;
    if (color === 'w') {
      if (
        playedMove.bestLine.marterial >= 0 &&
        pointAcc.w.includes('q') &&
        !pointAcc.b.includes('q')
      ) {
        playedMove.bestLine.description = `It always great to capture oppoment's Queen`;
        playedMove.classification = MoveClassification.great;
        input.playedMove.affectedRule = 'greatWinMaterial';

        if (
          best.bestLine.marterial >= 0 &&
          bestPointAcc.w.includes('q') &&
          !bestPointAcc.b.includes('q')
        ) {
          best.bestLine.description = `It always great to capture oppoment's Queen`;
          best.classification = MoveClassification.great;
          input.best.affectedRule = 'greatWinMaterial';
        }
        return input;
      }
    }

    if (color === 'b') {
      if (
        playedMove.bestLine.marterial > 0 &&
        pointAcc.b.includes('q') &&
        !pointAcc.w.includes('q')
      ) {
        playedMove.bestLine.description = `It always great to capture oppoment's Queen`;
        playedMove.classification = MoveClassification.great;
        input.playedMove.affectedRule = 'greatWinMaterial';

        if (
          best.bestLine.marterial > 0 &&
          bestPointAcc.b.includes('q') &&
          !bestPointAcc.w.includes('q')
        ) {
          best.bestLine.description = `Make a benefit trade oppoment's Queen`;
          best.classification = MoveClassification.great;
          input.best.affectedRule = 'greatWinMaterial';
        }
        return input;
      }
    }
  }
  return null;
}
