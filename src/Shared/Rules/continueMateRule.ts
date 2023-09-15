import { ReviewedMove } from '../Model';

export function continueMateRule(input: ReviewedMove, previous: ReviewedMove) {
  // case of forcemate

  const { best, playedMove } = input;
  if (best.bestLine && playedMove.bestLine && previous?.playedMove?.bestLine) {
    const line = playedMove.bestLine;

    if (
      (line && line.score.type === 'mate') ||
      previous.playedMove.bestLine?.score.type === 'mate'
    ) {
      if (line.score.value < 0) {
        playedMove.bestLine.description = `You continue keep your force checkmate going. You will finish the game in  ${Math.abs(
          line.score.value
        )} moves. There's no way to prevent it now.`;
      } else {
        playedMove.bestLine.description = `You keep driving to victory with force checkmate in ${Math.abs(
          line.score.value
        )} moves. It's an unstoppable strategy.`;
      }
      input.playedMove.affectedRule = 'continueMateRule';
      return input;
    }
  }
  return null;
}
