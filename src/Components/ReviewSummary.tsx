/// <reference types="vite-svg-loader" />
import { ReactNode } from 'react';
import BriliantIcon from './icons/Briliant.svg?url';
import BlunderIcon from './icons/Blunder.svg?url';
import MissIcon from './icons/Miss.svg?url';
import Mistake from './icons/Mistake.svg?url';
import Inaccuracy from './icons/Inaccuracy.svg?url';
import Good from './icons/Good.svg?url';
import Book from './icons/Book.svg?url';
import Great from './icons/Great.svg?url';
import Best from './icons/Best.svg?url';
import Excellent from './icons/Excellent.svg?url';

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

export function ReviewSummary({
  data: {
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
  },
  result,
}: any) {
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
          icon={<Icon src={BriliantIcon} />}
        />
        <LineItem
          type="Great Move"
          whiteCount={wgreat}
          blackCount={bgreat}
          icon={<Icon src={Great} />}
        />
        <LineItem
          type="Best Move"
          whiteCount={wbest}
          blackCount={bbest}
          icon={<Icon src={Best} />}
        />
        <LineItem
          type="Excellent"
          whiteCount={wexcellent}
          blackCount={bexcellent}
          icon={<Icon src={Excellent} />}
        />
        <LineItem
          type="Good"
          whiteCount={wgood}
          blackCount={bgood}
          icon={<Icon src={Good} />}
        />
        <LineItem
          type="Book"
          whiteCount={book[0]}
          blackCount={book[1]}
          icon={<Icon src={Book} />}
        />
        <LineItem
          type="Inaccuracy"
          whiteCount={winaccuracy}
          blackCount={binaccuracy}
          icon={<Icon src={Inaccuracy} />}
        />
        <LineItem
          type="Mistake"
          whiteCount={wmistake}
          blackCount={bmistake}
          icon={<Icon src={Mistake} />}
        />
        <LineItem
          type="Miss"
          whiteCount={0}
          blackCount={0}
          icon={<Icon src={MissIcon} />}
        />
        <LineItem
          type="Blunder"
          whiteCount={wblunder}
          blackCount={bblunder}
          icon={<Icon src={BlunderIcon} />}
        />
      </div>
    </div>
  );
}
export default ReviewSummary;
