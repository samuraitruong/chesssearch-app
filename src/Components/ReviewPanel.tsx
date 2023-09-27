import { MutableRefObject } from 'react';
import { ReviewedMove, ReviewedMoveOutput } from '../Shared/Model';
import { partitionListIntoPairs } from '../Shared/Utils';
import { LineReview } from './LineReview';

interface MoveListProps {
  moveList: ReviewedMove[];
  currentMoveIndex: number;
  currentMove?: ReviewedMove;
  moveTo: (index: number) => void;
  onShowMove: (move: ReviewedMoveOutput) => void;
  lineRefs: MutableRefObject<any>;
}
const getClassName = (m: ReviewedMove) => {
  if (!m) return '';
  return 'move-classification-' + m.playedMove?.classification || '';
};

export function ReviewPanel({
  moveList,
  currentMoveIndex,
  moveTo,
  currentMove,
  onShowMove,
  lineRefs,
}: MoveListProps) {
  const pairMoves = partitionListIntoPairs(moveList);

  return (
    <>
      {pairMoves?.map(([white, black], index) => (
        <div key={index} ref={(ref) => (lineRefs.current[index] = ref)}>
          <div
            className="flex w-full items-center border-b border-dashed border-gray-300 mb-1"
            key={index}
            data-move-index={Math.round(index / 2)}
          >
            <span className="font-semibold text-right w-[25px] block mr-2">
              {index + 1}.
            </span>
            <a
              className={`font-semibold  cursor-pointer  pl-3 flex-1 hover:bg-slate-600 hover:text-white ${
                index * 2 === currentMoveIndex
                  ? 'bg-blue-500 font-medium text-white'
                  : ''
              } ${getClassName(white)}`}
              onClick={() => moveTo(index * 2)}
            >
              {white?.san}
            </a>
            <a
              className={`font-semibold cursor-pointer pl-3 flex-1 hover:bg-slate-600 hover:text-white ${
                index * 2 + 1 === currentMoveIndex
                  ? 'bg-blue-500 font-medium text-white'
                  : ''
              } ${getClassName(black)}`}
              onClick={() => moveTo(index * 2 + 1)}
            >
              {black?.san}
            </a>
          </div>
          {(currentMoveIndex == index * 2 ||
            index * 2 + 1 === currentMoveIndex) &&
            currentMove?.playedMove?.bestLine && (
              <LineReview move={currentMove} onShowMove={onShowMove} />
            )}
        </div>
      ))}
    </>
  );
}
