import { Chess } from 'chess.js';

export function partitionListIntoPairs<T>(arr: T[]): Array<T[]> {
  return arr.reduce((result, current, index) => {
    if (index % 2 === 0) {
      result.push([current]);
    } else {
      result[Math.floor(index / 2)].push(current);
    }
    return result;
  }, [] as Array<T[]>);
}

export function simulateGame(moves: string[]) {
  const simulateGame = new Chess();
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
  const captured: any = {
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
      const pointName = move.color + 'Point';
      captured[pointName] += points[move.captured];
      captured[move.color].push(move.captured as string);
    }
    return { ...move, captured_pieces: JSON.parse(JSON.stringify(captured)) };
  });
  return lines;
}
