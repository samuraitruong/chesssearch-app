import {
  MoveClassification,
  MoveClassificationColors,
  MoveClassificationIcons,
} from '../Shared/Constants';
import { ReviewedMove, ReviewedMoveOutput } from '../Shared/Model';
import Popover, { PopoverTriggerType } from '@idui/react-popover';
import { MiniBoard } from './MiniBoard';
interface LineReviewProps {
  move?: ReviewedMove;
}

function DisplayReviewedMoveOutput({
  move,
  overwriteClassification,
}: {
  move: ReviewedMoveOutput;
  overwriteClassification?: MoveClassification;
}) {
  const { classification, bestLine } = move;
  const cl = overwriteClassification || classification;
  if (!cl || !bestLine) {
    return <></>;
  }
  const eloChanged = +(bestLine.score.value / 100).toFixed(1);
  const eloText =
    eloChanged > 0 ? `+${eloChanged}` : `-${Math.abs(eloChanged)}`;
  return (
    <div className="py-3">
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
        <div className="mr-5  py-1 px-4 font-bold bg-slate-200 text-black text-center rounded-sm">
          {eloText}
        </div>
      </div>
      <p className="py-2">{bestLine.description}</p>
      {bestLine.moves.map((m) => (
        <Popover
          lazy={true}
          className="aaaa"
          zIndex={50}
          closeOnEscape={true}
          content={
            <MiniBoard
              position={m.after}
              size={200}
              arrows={[[m.from, m.to]]}
            />
          }
          trigger={PopoverTriggerType.hover}
          key={m.san + m.lan + m.to}
        >
          <span className="pointer font-semibold text-gray-500 pr-1 z-50">
            {' '}
            {m.san}
          </span>
        </Popover>
      ))}
    </div>
  );
}

export function LineReview({ move }: LineReviewProps) {
  if (!move || !move.playedMove || !move.playedMove.bestLine) {
    return <></>;
  }

  const showPlayedMove = move.playedMove.bestmove !== move.best.bestmove;

  return (
    <div className="p-3 border">
      {showPlayedMove && (
        <div>
          <DisplayReviewedMoveOutput move={move.playedMove} />
          <DisplayReviewedMoveOutput
            move={move.best}
            overwriteClassification={MoveClassification.best}
          />
        </div>
      )}

      {!showPlayedMove && (
        <DisplayReviewedMoveOutput
          move={move.best}
          overwriteClassification={MoveClassification.best}
        />
      )}
    </div>
  );
}
