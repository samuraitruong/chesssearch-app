import { Chessboard } from 'react-chessboard';

export function MiniBoard({ position }: any) {
  return (
    <Chessboard
      boardWidth={100}
      position={position}
      arePiecesDraggable={false}
    />
  );
}
