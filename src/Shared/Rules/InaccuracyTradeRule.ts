import { ReviewedMove } from '../Model';

export function inaccuracyTradeRule(input: ReviewedMove) {
  const { best, playedMove } = input;
  if (best.bestLine && playedMove.bestLine) {
    const lastPlayedMove = playedMove.bestLine.moves[
      playedMove.bestLine.moves.length - 1
    ] as any;
    if (
      best.bestLine.marterial === playedMove.bestLine.marterial &&
      lastPlayedMove.captured_pieces.wPoint > 0
    ) {
      if (best.bestLine.winChance || 0 > playedMove.bestLine.winChance) {
        // in this case, equally trade the material but possion is not good
        playedMove.bestLine.description =
          'You overlooked the equally trade for material, After the trade you winning position is worser';
        playedMove.affectedRule = 'InaccuracyTradeRule';
        return input;
      }
    }
  }
  return null;
}
