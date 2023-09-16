import { useEffect, useState } from 'react';
import bg from './icons/captured-pieces.png?url';
import './CapturedPieces.css';

interface CapturedPiecesProps {
  capturedPieces?: string[];
  color: string;
  point: number;
}
function condensePiece(inputs: string[]) {
  const mappings: { [x: string]: string } = {
    p: 'pawn',
    b: 'bishop',
    n: 'knight',
    r: 'rook',
    q: 'queen',
  };
  const results = [];
  for (const p of ['p', 'n', 'b', 'r', 'q']) {
    const count = inputs.filter((x) => x === p).length;
    if (count == 1) results.push(`${mappings[p]}`);
    if (count > 1) results.push(`${count}-${mappings[p]}s`);
  }
  return results;
}
function CapturedPieces({
  capturedPieces = [],
  color,
  point = 0,
}: CapturedPiecesProps) {
  const [pieces, setPieces] = useState<string[]>([]);
  useEffect(() => {
    setPieces(condensePiece(capturedPieces));
  }, [capturedPieces]);
  return (
    <div className="flex w-full justify-start align-bottom items-end h-[30px] transform scale-50 origin-top-left">
      {pieces.map((piece, index) => (
        <span
          key={index}
          className={`captured-pieces-cpiece captured-pieces-${color}-${piece}`}
          style={{
            backgroundImage: `url(${bg})`,
          }}
        ></span>
      ))}
      {point > 0 && <span className="text-2xl pl-5 pt-1"> +{point}</span>}
    </div>
  );
}

export default CapturedPieces;
