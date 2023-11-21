import type { Hit } from 'instantsearch.js';
import { BiSolidMap, BiCalendarEvent, BiSolidChess } from 'react-icons/bi';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { Highlight } from 'react-instantsearch';
import { MiniBoard } from './MiniBoard';

type HitProps = {
  hit: Hit;
  onHitClick: (item: Hit) => void;
};

export function HitCard({ hit, onHitClick }: HitProps) {
  return (
    <div
      className="flex flex-col w-full"
      data-testId="game-hit-card"
      onClick={() => onHitClick(hit)}
    >
      <div className=" flex items-center w-full] align-middle justify-around mb-2">
        <div className="w-[100px]">
          <MiniBoard position={hit.LastPosition || hit.fen} />
        </div>
        <div className="text-2xl font-semibold sm:text-lg">
          {hit.Result || hit.result}
        </div>
      </div>

      <div className="w-full">
        <h2>
          <BiSolidChess className="inline-block mr-1" />
          <Highlight attribute="White" hit={hit} />
        </h2>
        <h2>
          <BiSolidChess className="inline-block mr-1" />
          <Highlight attribute="Black" hit={hit} />
        </h2>
        <p>
          <BiCalendarEvent className="inline-block mr-1" />
          <Highlight attribute="Event" hit={hit} />
          <br />
          <BiSolidMap className="inline-block mr-1" />
          <Highlight attribute="Site" hit={hit} /> <br />
          <BsFillCalendarDateFill className="inline-block mr-1" />
          {hit.Date ? (
            <Highlight attribute="Date" hit={hit} />
          ) : (
            <Highlight attribute="EventDate" hit={hit} />
          )}
        </p>
      </div>
    </div>
  );
}
