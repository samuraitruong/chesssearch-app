import { ReviewedMove } from '../Model';

export function winMoreMaterialAfterTrade(input: ReviewedMove) {
  const { best, playedMove } = input;
  if (best.bestLine && playedMove.bestLine) {
    if (
      best.bestLine.marterial === playedMove.bestLine.marterial &&
      playedMove.bestLine.marterial !== 0
    ) {
      if (best.bestLine.winChance || 0 > playedMove.bestLine.winChance) {
        // in this case, equally trade the material but possion is not good
        playedMove.bestLine.description =
          'You overlooked the equally trade for material, After the trade you winning position is worser';
        playedMove.affectedRule = 'WinMoreMaterialAfterTrade';
        return input;
      }
    }
  }
  return null;
}
