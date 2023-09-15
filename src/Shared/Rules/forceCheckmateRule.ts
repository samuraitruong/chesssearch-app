import { ReviewedMove } from '../Model';

export function forceCheckMateRule(input: ReviewedMove) {
  // case of forcemate

  const { best, playedMove } = input;
  if (best.bestLine && playedMove.bestLine) {
    const line = playedMove.bestLine;

    if (line.score.type === 'mate') {
      if (line.score.value < 0) {
        playedMove.bestLine.description = `Oops, you've just made a significant error that sets up a force checkmate for your opponent in the next ${Math.abs(
          line.score.value
        )} moves. There's no way to prevent it now.`;

        if (best.bestLine.score.type === 'cp') {
          best.bestLine.description =
            'This move will help to keep your game continue without being force checkmate';
        }

        if (best.bestLine.score.type === 'mate') {
          best.bestLine.description =
            'You spot the best move but it does not help save the game. You oppoment will win as force checkmate';
        }
      } else {
        if (playedMove.bestLine.score.value > best.bestLine.score.value) {
          best.bestLine.description =
            'This move is more effective as it helps you achieve victory faster';
          playedMove.bestLine.description = `Even this is not a best move, But you still keep winning as force checkmate and can not be stop`;
        } else {
          playedMove.bestLine.description = `You can now achieve checkmate using the force in ${Math.abs(
            line.score.value
          )} moves. It's an unstoppable strategy.`;

          best.bestLine.description =
            'You are going ahead to victory with force checkmate.';
        }
      }
      input.playedMove.affectedRule = 'forceCheckMateRule';
      return input;
    }
  }
  return null;
}
