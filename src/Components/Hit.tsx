import type { Hit } from 'instantsearch.js';
import { BiSolidMap, BiCalendarEvent, BiSolidChess } from 'react-icons/bi';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { MdOutlineSportsScore } from 'react-icons/md';
import { Highlight } from 'react-instantsearch';
import { MiniBoard } from './MiniBoard';

type HitProps = {
  hit: Hit;
  onHitClick: (item: any) => void;
};

export function Hit({ hit, onHitClick }: HitProps) {
  return (
    <div
      className="flex w-full justify-between"
      onClick={() => onHitClick(hit)}
    >
      <div className="w-1/2">
        <h2>
          <BiSolidChess className="inline-block mr-1" />
          <Highlight attribute="White" hit={hit} /> vs{' '}
          <Highlight attribute="Black" hit={hit} />
        </h2>
        <p>
          <BiCalendarEvent className="inline-block mr-1" />
          <Highlight attribute="Event" hit={hit} />
          <br />
          <BiSolidMap className="inline-block mr-1" />
          <Highlight attribute="Site" hit={hit} /> <br />
          <BsFillCalendarDateFill className="inline-block mr-1" />
          <Highlight attribute="Date" hit={hit} />
          <Highlight attribute="EventDate" hit={hit} />
        </p>
      </div>
      <div className="text-3xl pt-5">
        <MdOutlineSportsScore className="inline-block mr-0 ml-5" />{' '}
        <Highlight attribute="Result" hit={hit} />
      </div>
      <div className="flex flex-col">
        <MiniBoard position={hit.fen || hit.LastPosition} />
      </div>
    </div>
  );
}
