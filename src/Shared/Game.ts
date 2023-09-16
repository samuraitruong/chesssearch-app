import { Chess } from 'chess.js';
import {
  PieceCaptureAccumulate,
  ReviewedLine,
  ReviewedMove,
  StockfishLine,
} from './Model';
import { applyReviewRules } from './Rules/Index';

export function simulateInitialGame(moves: string[]) {
  const moveToSimulates = moves;
  // if (import.meta.env.VITE_DEBUG_GAME) {
  //   moveToSimulates = import.meta.env.VITE_DEBUG_GAME.replace(/\r/, '')
  //     .split(' ')
  //     .filter((x: string) => x.trim())
  //     .filter(
  //       (x: string) =>
  //         !x.includes('$') &&
  //         !x.includes('.') &&
  //         !['1-0', '0-1', '*', '1/2-1/2'].includes(x)
  //     );
  //   console.log(moveToSimulates);
  // }
  return simulateGame(moveToSimulates);
}
export function simulateGame(moves: string[], startFen?: string) {
  const simulateGame = new Chess(startFen);

  for (const move of moves) {
    try {
      simulateGame.move(move.replace('#', ''));
    } catch (err) {
      console.log(err);
    }
  }
  const captured: PieceCaptureAccumulate = {
    wPoint: 0,
    w: [],
    b: [],
    bPoint: 0,
  };
  const points: { [x: string]: number } = {
    p: 1,
    n: 3,
    b: 3,
    r: 6,
    q: 9,
  };
  const lines = simulateGame.history({ verbose: true }).map((move) => {
    if (move.captured) {
      if (move.color === 'w') {
        captured.wPoint += points[move.captured];
      } else captured.bPoint += points[move.captured];
      captured[move.color].push(move.captured as string);
    }
    return { ...move, captured_pieces: JSON.parse(JSON.stringify(captured)) };
  });
  return lines;
}

export function reviewMoveLine(fen: string, line: StockfishLine): ReviewedLine {
  const [, color] = fen.split(' ');
  const moves = simulateGame(line.pv.split(' '), fen);
  const lastMove = moves[moves.length - 1];
  let materialDiff =
    lastMove.captured_pieces.wPoint - lastMove.captured_pieces.bPoint;
  if (color === 'b') {
    materialDiff = -materialDiff;
  }
  let description = `I not sure how to review this now, but I will keep improve this message :)`;

  if (materialDiff > 0) {
    description = `You win ${Math.abs(
      materialDiff
    )} material point after all the moves`;

    if (materialDiff > 10) {
      description =
        'It is a great move that will help you completely change the game winning position';
    }
  }
  if (materialDiff < 0) {
    description = `You lose ${Math.abs(
      materialDiff
    )} material points afer all the trade`;
  }

  return {
    description,
    ...line,
    marterial: materialDiff,
    moves,
  } as any;
}
/**
 * This funtion to do final review, include compare the move and adjust bestline review/classification. This is not easy function, will need to do lots of if/else here
 * @param move
 * @returns
 */
export function advanceCompareReview(
  move: ReviewedMove,
  previousMove: ReviewedMove
) {
  const result = { ...move };
  // other validation here
  return applyReviewRules(result, previousMove);
}
