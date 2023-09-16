import { MoveClassification } from '../Constants';
import { ReviewedMove } from '../Model';

export function blunderQueenRule(input: ReviewedMove) {
  // case of forcemate

  const { best, playedMove } = input;
  if (
    [MoveClassification.blunder, MoveClassification.mistake].includes(
      playedMove.classification
    ) &&
    best.bestLine &&
    playedMove.bestLine
  ) {
    // check if you Blunded your queen
    const captured_pieces =
      playedMove.bestLine.moves[playedMove.bestLine.moves.length - 1]
        .captured_pieces;
    const color = input.color;

    if (color === 'w' && captured_pieces.b.includes('q')) {
      playedMove.bestLine.description = 'You give away your queen';
      playedMove.affectedRule = 'blunderQueenRule';
      playedMove.classification = MoveClassification.blunder;
      return input;
    }

    if (color === 'b' && captured_pieces.w.includes('q')) {
      playedMove.bestLine.description = 'You give away your queen';
      playedMove.affectedRule = 'blunderQueenRule';
      playedMove.classification = MoveClassification.blunder;
      return input;
    }
  }
  return null;
}
