import { MoveClassification } from '../Constants';
import { ReviewedMove } from '../Model';

export function missMateRule(input: ReviewedMove) {
  const { best, playedMove } = input;
  if (best.bestLine && playedMove.bestLine) {
    if (
      best.bestLine.marterial === playedMove.bestLine.marterial &&
      playedMove.bestLine.marterial !== 0
    ) {
      if (
        best.bestLine.score.type === 'mate' &&
        playedMove.bestLine.score.type === 'cp'
      ) {
        // in this case, equally trade the material but possion is not good
        playedMove.bestLine.description = `You miss a change for force checkmate in ${best.bestLine.score} moves.`;
        playedMove.classification = MoveClassification.miss;
        playedMove.affectedRule = 'MissMateRule';
        return input;
      }
    }
  }
  return null;
}
