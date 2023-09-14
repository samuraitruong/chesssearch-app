import { Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
interface MiniBoardProps {
  position: string;
  size?: number;
  arrows?: Array<string[]>;
}
export function MiniBoard({
  position,
  size = 100,
  arrows = [],
}: MiniBoardProps) {
  return (
    <Chessboard
      customArrowColor="#11d954"
      boardWidth={size}
      position={position}
      customArrows={arrows as Square[][]}
      arePiecesDraggable={false}
    />
  );
}
