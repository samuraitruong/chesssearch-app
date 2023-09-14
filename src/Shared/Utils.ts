import { Chess, PieceSymbol } from 'chess.js';
import { StockfishLine } from './Model';

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

export function findPiecePosition(
  fen: string,
  color: 'b' | 'w',
  piece: PieceSymbol
) {
  const game = new Chess(fen);
  const board = game.board();

  const results = board.flatMap((row) =>
    row.filter((c) => c?.color === color && c.type === piece)
  );
  return results;
}

export function sortStockfishLine(line1: StockfishLine, line2: StockfishLine) {
  if (line1.score.value === line2.score.value) {
    return line2.depth - line1.depth;
  }
  return line2.score.value - line1.score.value;
}
