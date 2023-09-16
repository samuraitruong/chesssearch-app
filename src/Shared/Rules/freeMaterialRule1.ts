import { MoveClassification, PieceNames } from '../Constants';
import { ReviewedMove } from '../Model';

export function freeMaterialRule(input: ReviewedMove) {
  const { best, playedMove } = input;

  if (best.bestLine && playedMove.bestLine) {
    if (
      best.bestLine?.marterial > playedMove.bestLine?.marterial &&
      playedMove.classification !== MoveClassification.best
    ) {
      // in this case, seem you missed a change
      const lastMove = best.bestLine?.moves[0];
      if (lastMove?.captured && best.bestLine.moves.length === 1) {
        const capturedPieceName = PieceNames[lastMove.captured];
        playedMove.bestLine.description = `You missed a change to capture a free ${capturedPieceName}`;
        playedMove.classification = MoveClassification.miss;

        best.bestLine.description = `You win the free ${capturedPieceName}`;
        playedMove.affectedRule = 'freeMaterialRule';
        return input;
      }

      // check if the capture is only 1, then it will be missed case
    }
  }
  return null;
}
