import { MoveClassification } from '../Constants';
import { ReviewedMove } from '../Model';

export function hugeMaterialMiss(input: ReviewedMove) {
  const { best, playedMove } = input;
  if (best.bestLine && playedMove.bestLine) {
    if (best.bestLine.marterial - playedMove.bestLine.marterial > 12) {
      // in this case, equally trade the material but possion is not good
      playedMove.bestLine.description = `You're missing a great opportunity to gain material. After all, following the trade, you'll be in a winning position`;
      playedMove.classification = MoveClassification.miss;
      best.bestLine.description =
        'You will be in a commanding position after gaining a substantial material advantage.';
      playedMove.affectedRule = 'hugeMaterialMiss';
      return input;
    }
  }
  return null;
}
