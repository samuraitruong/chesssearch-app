import { ReviewedMove } from '../Model';

export function victoryMateRule(input: ReviewedMove) {
  // case of forcemate

  const { best, playedMove } = input;
  if (best.bestLine && playedMove.bestLine) {
    if (playedMove.bestLine.moves?.[0].san?.includes('#')) {
      playedMove.affectedRule = 'victoryMateRule';
      const message = "You've executed the winning move, concluding the game.";
      playedMove.bestLine.description = message;
      best.bestLine.description = message;
      return input;
    }
  }
  return null;
}
