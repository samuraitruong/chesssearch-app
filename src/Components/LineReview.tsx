import {
  MoveClassification,
  MoveClassificationColors,
  MoveClassificationIcons,
} from '../Shared/Constants';
import { ReviewedMove, ReviewedMoveOutput } from '../Shared/Model';
import Popover, { PopoverTriggerType } from '@idui/react-popover';
import { MiniBoard } from './MiniBoard';
import { BiSolidChess } from 'react-icons/bi';
interface LineReviewProps {
  move?: ReviewedMove;
  onShowMove: (move: ReviewedMoveOutput) => void;
}

function DisplayReviewedMoveOutput({
  move,
  overwriteClassification,
  onShowMove,
  startIndex,
}: {
  move: ReviewedMoveOutput;
  onShowMove: (move: ReviewedMoveOutput) => void;
  overwriteClassification?: MoveClassification;
  startIndex: number;
}) {
  const { classification, bestLine } = move;
  let index = Math.floor(startIndex / 2) + 1;

  const cl = ![MoveClassification.briliant, MoveClassification.great].includes(
    classification
  )
    ? overwriteClassification || classification
    : classification;
  if (!cl || !bestLine) {
    return <></>;
  }
  const eloChanged = +(bestLine.score.value / 100).toFixed(1);
  let eloText = eloChanged > 0 ? `+${eloChanged}` : `-${Math.abs(eloChanged)}`;

  if (bestLine.score.type === 'mate') {
    const sign = bestLine.score.value < 0 ? '-' : '';
    eloText = `${sign}M${Math.abs(bestLine.score.value)}`;
  }

  return (
    <div className="p-3 bg-gray-100 mb-5 rounded-lg">
      <div className="flex justify-between mb-2">
        <h2
          style={{
            color: MoveClassificationColors[cl],
          }}
        >
          <img
            src={MoveClassificationIcons[cl]}
            className="inline"
            width={32}
          />
          <span className="mx-1 font-semibold">{bestLine.moves[0].san}</span>
          <span className="font-semibold">is a {cl} move</span>
        </h2>
        <div className="mr-5  py-1 px-4 font-bold bg-slate-300 text-black text-center rounded-sm">
          {eloText}
        </div>
      </div>
      <p className="py-2">{bestLine.description}</p>
      <div className="mb-3">
        {bestLine.moves.map((m, i) => (
          <Popover
            lazy={false}
            className={'pop' + i}
            zIndex={50}
            closeOnEscape={true}
            onChangeOpen={(isOpen) => {
              if (!isOpen) {
                document.querySelector('.pop' + i)?.classList.add('hideme');
              } else {
                document.querySelector('.pop' + i)?.classList.remove('hideme');
              }
            }}
            content={
              <MiniBoard
                position={m.after}
                size={200}
                arrows={[[m.from, m.to]]}
              />
            }
            trigger={PopoverTriggerType.hover}
            key={m.san + m.lan + m.to + i}
          >
            <span className="pointer font-semibold text-gray-500 pr-1 z-50 cursor-pointer hover:underline">
              {' '}
              {m.color === 'w' ? `${index++}.` : ''}
              {m.color === 'b' && i === 0 ? `${index++}...` : ' '}
              {m.san}
            </span>
          </Popover>
        ))}
      </div>
      <div className="text-center w-full m-3">
        <button
          className="rounded-sm text-sm bg-green-300 p-2 font-semibold hover:bg-blue-700 hover:text-white"
          onClick={() => onShowMove(move)}
        >
          <BiSolidChess className="inline" />
          Show Moves
        </button>
      </div>
    </div>
  );
}

export function LineReview({ move, onShowMove }: LineReviewProps) {
  if (!move || !move.playedMove || !move.playedMove.bestLine) {
    return <></>;
  }

  const showPlayedMove = move.playedMove.bestmove !== move.best.bestmove;
  return (
    <div className="p-3 border">
      {showPlayedMove && (
        <div>
          <DisplayReviewedMoveOutput
            move={move.playedMove}
            onShowMove={onShowMove}
            startIndex={move.index}
          />
          {![MoveClassification.briliant, MoveClassification.great].includes(
            move.playedMove.classification
          ) && (
            <DisplayReviewedMoveOutput
              onShowMove={onShowMove}
              startIndex={move.index}
              move={move.best}
              overwriteClassification={MoveClassification.best}
            />
          )}
        </div>
      )}

      {!showPlayedMove && (
        <DisplayReviewedMoveOutput
          startIndex={move.index}
          onShowMove={onShowMove}
          move={move.best}
          overwriteClassification={MoveClassification.best}
        />
      )}
    </div>
  );
}
