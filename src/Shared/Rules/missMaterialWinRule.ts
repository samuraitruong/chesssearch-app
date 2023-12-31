import { MoveClassification } from '../Constants';
import { ReviewedMove } from '../Model';
/**
 * This to review line when we win material with piece that capture Queen
 * @param input
 * @returns
 */
export function missMaterialWinRule(input: ReviewedMove) {
  // case of forcemate

  const { best, playedMove } = input;
  if (best.bestLine && playedMove.bestLine) {
    if (playedMove.bestLine.marterial <= 0 && best.bestLine.marterial >= 3) {
      // this is multiple trade
      playedMove.bestLine.description =
        'You miss the good change to win material';

      if (
        playedMove.classification !== MoveClassification.blunder &&
        playedMove.bestmove !== best.bestmove
      ) {
        // in this case, check if position is not worse, then classify as missed
        if (
          playedMove.bestLine.score.type === 'cp' &&
          playedMove.bestLine.score.value >= 0
        ) {
          playedMove.classification = MoveClassification.miss;
        }
      }
      if (
        playedMove.classification !== MoveClassification.blunder &&
        playedMove.bestmove !== best.bestmove
      ) {
        playedMove.classification = MoveClassification.miss;
        best.bestLine.description =
          'You win material after all the good trades';
      }
      playedMove.affectedRule = 'missMaterialWinRule';
      return input;
    }
  }
  return null;
}
