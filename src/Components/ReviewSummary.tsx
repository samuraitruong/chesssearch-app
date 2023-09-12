/// <reference types="vite-svg-loader" />
import { ReactNode } from 'react';
import { MoveClassificationIcons } from '../Libs/Constants';

interface LineItemProps {
  type: string;
  whiteCount: number;
  blackCount: number;
  icon: ReactNode;
}
function LineItem({ type, whiteCount, blackCount, icon }: LineItemProps) {
  const cssName =
    'move-classification-' + type.toLocaleLowerCase().replace(' ', '-');
  return (
    <div className={`flex w-full justify-between ${cssName} text-sm`}>
      <div className="pl-5">{whiteCount}</div>
      <div>
        {icon}
        <span className="ml-1 font-semibold">{type}</span>
      </div>

      <div className="pr-5"> {blackCount}</div>
    </div>
  );
}

interface IconProps {
  src: string;
}

function Icon({ src }: IconProps) {
  return <img src={src} className="inline" />;
}

export function ReviewSummary({ data, result }: any) {
  const {
    accuracy,
    good,
    inaccuracy,
    mistake,
    excellent,
    best,
    blunder,
    briliant,
    great,
    book,
  } = data;
  const [wmistake, bmistake] = mistake;
  const [wgood, bgood] = good;
  const [winaccuracy, binaccuracy] = inaccuracy;
  const [waccuracy, baccuracy] = accuracy;
  const [wexcellent, bexcellent] = excellent;
  const [wbest, bbest] = best;
  const [wblunder, bblunder] = blunder;
  const [wbriliant, bbriliant] = briliant;
  const [wgreat, bgreat] = great;
  return (
    <div className="mb-3">
      <h2 className="text-center py-5 font-bold">Game Review</h2>
      <div className="flex justify-between mb-5">
        <div className="flex flex-col border border-solid border-gray-400 py-3 px-8 items-center">
          <div className="text-3xl font-bold">{waccuracy.toFixed(1)}</div>

          <span className="text-gray-500">Accuracy</span>
        </div>
        <div className="flex justify-center align-middle items-center font-semibold">
          {result}
        </div>
        <div className="flex flex-col border border-solid border-gray-400 py-3 px-8 items-center">
          <div className="text-3xl font-bold">{baccuracy.toFixed(1)}</div>
          <span className="text-gray-500">Accuracy</span>
        </div>
      </div>

      <div className="flex justify-between mb-2 flex-col">
        <LineItem
          type="Briliant"
          whiteCount={wbriliant}
          blackCount={bbriliant}
          icon={<Icon src={MoveClassificationIcons.briliant} />}
        />
        <LineItem
          type="Great Move"
          whiteCount={wgreat}
          blackCount={bgreat}
          icon={<Icon src={MoveClassificationIcons.great} />}
        />
        <LineItem
          type="Best Move"
          whiteCount={wbest}
          blackCount={bbest}
          icon={<Icon src={MoveClassificationIcons.best} />}
        />
        <LineItem
          type="Excellent"
          whiteCount={wexcellent}
          blackCount={bexcellent}
          icon={<Icon src={MoveClassificationIcons.excellent} />}
        />
        <LineItem
          type="Good"
          whiteCount={wgood}
          blackCount={bgood}
          icon={<Icon src={MoveClassificationIcons.good} />}
        />
        <LineItem
          type="Book"
          whiteCount={book[0]}
          blackCount={book[1]}
          icon={<Icon src={MoveClassificationIcons.book} />}
        />
        <LineItem
          type="Inaccuracy"
          whiteCount={winaccuracy}
          blackCount={binaccuracy}
          icon={<Icon src={MoveClassificationIcons.inaccuracy} />}
        />
        <LineItem
          type="Mistake"
          whiteCount={wmistake}
          blackCount={bmistake}
          icon={<Icon src={MoveClassificationIcons.mistake} />}
        />
        <LineItem
          type="Miss"
          whiteCount={0}
          blackCount={0}
          icon={<Icon src={MoveClassificationIcons.miss} />}
        />
        <LineItem
          type="Blunder"
          whiteCount={wblunder}
          blackCount={bblunder}
          icon={<Icon src={MoveClassificationIcons.blunder} />}
        />
      </div>
    </div>
  );
}
export default ReviewSummary;
