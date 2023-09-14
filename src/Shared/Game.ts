import { Chess } from 'chess.js';
import { PieceCaptureAccumulate, ReviewedLine, StockfishLine } from './Model';

// export class Game extends Chess {
//   constructor(fen: string) {
//     super(fen);
//   }

//   public getMoveList(moves: string[], startFen?: string) {
//     if (startFen) {
//       // how to reset fen
//     }

//     for (const move of moves) {
//       this.move(move.replace('#', ''));
//     }
//     const captured: any = {
//       wPoint: 0,
//       w: [],
//       b: [],
//       bPoint: 0,
//     };
//     const points: { [x: string]: number } = {
//       p: 1,
//       n: 3,
//       b: 3,
//       r: 6,
//       q: 9,
//     };
//     const lines = this.history({ verbose: true }).map((move) => {
//       if (move.captured) {
//         const pointName = move.color + 'Point';
//         captured[pointName] += points[move.captured];
//         captured[move.color].push(move.captured as string);
//       }
//       return { ...move, captured_pieces: JSON.parse(JSON.stringify(captured)) };
//     });
//     return lines;
//   }
// }

export function simulateGame(moves: string[], startFen?: string) {
  const simulateGame = new Chess(startFen);
  // const mockedMoves = `1. e4 e5 2. Nf3 Bc5 $6 3. d4 $9 exd4 4. Nxd4 Nf6 5. Nf5 $6 g6 $2 6. Ng7+ Kf8 $1 7. Bh6 $1
  // Kg8 $1 8. Bc4 $2 d5 $1 9. exd5 $6 Ng4 10. Qd2 Nxh6 11. Qxh6 Qe7+ $6 12. Kf1 $2 Bd4 $6 13.
  // d6 $6 Qf6 14. Ne8 $2 Qxf2# 0-1`;

  // const mockedMove = mockedMoves
  //   .replace(/\r/, '')
  //   .split(' ')
  //   .filter((x) => x.trim())
  //   .filter(
  //     (x) =>
  //       !x.includes('$') &&
  //       !x.includes('.') &&
  //       !['1-0', '0-1', '*', '1/2-1/2'].includes(x)
  //   );
  // console.log(mockedMove);
  for (const move of moves) {
    simulateGame.move(move.replace('#', ''));
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
  }
  if (materialDiff < 0) {
    description = `You lose ${Math.abs(
      materialDiff
    )} material points afer all the trade`;
  }
  // case of forcemate
  if (line.score.type === 'mate') {
    if (line.score.value < 0) {
      description = `Oops, you've just made a significant error that sets up a force checkmate for your opponent in the next ${Math.abs(
        line.score.value
      )} moves. There's no way to prevent it now.`;
    } else {
      description = `You can now achieve checkmate using the force in ${Math.abs(
        line.score.value
      )} moves. It's an unstoppable strategy.`;
    }
  }
  return {
    description,
    ...line,
    marterial: materialDiff,
    moves,
  };
}
