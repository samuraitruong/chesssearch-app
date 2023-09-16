import { ReviewedMove } from '../Model';
/**
 * This to review line when we win material with piece that capture Queen
 * @param input
 * @returns
 */
export function lostMaterialRule(input: ReviewedMove) {
  // case of forcemate

  const { best, playedMove } = input;
  if (best.bestLine && playedMove.bestLine) {
    if (playedMove.bestLine.marterial < 0 && best.bestLine.marterial >= 0) {
      // this is multiple trade

      if (
        playedMove.bestLine.moves.length > 1 &&
        best.bestLine.moves.length > 1
      ) {
        // TODO: maybe check for position after all the trade
        playedMove.bestLine.description = `You losing material this way. You lost total ${playedMove.bestLine.marterial} after all the trade`;
        best.bestLine.description =
          'This best move help you win more material after multiple trade';
        playedMove.affectedRule = 'lostMaterialRule';
        return input;
      }
    }
  }
  return null;
}
