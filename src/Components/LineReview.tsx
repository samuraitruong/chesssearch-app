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
          <span className="mx-1">{bestLine.moves[0].san}</span>
          is an {cl} move
        </h2>
        <div className="mr-5  py-1 px-4 font-bold bg-slate-200 text-black text-center">
          {eloText}
        </div>
      </div>
      <p>{bestLine.description}</p>
      {bestLine.moves.map((x) => (
        <Popover
          content={
            <MiniBoard
              position={x.after}
              size={200}
              arrows={[[x.from, x.to]]}
            />
          }
          trigger={PopoverTriggerType.hover}
          key={x.san + x.lan}
        >
          <span className="pointer font-semibold text-gray-800"> {x.san}</span>
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
