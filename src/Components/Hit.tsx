import type { Hit } from 'instantsearch.js';
import React from 'react';
import { BiSolidMap, BiCalendarEvent, BiSolidChess } from 'react-icons/bi';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { MdOutlineSportsScore } from 'react-icons/md';
import { Highlight } from 'react-instantsearch';

type HitProps = {
  hit: Hit;
  onHitClick: (item: any) => void;
};

export function Hit({ hit, onHitClick }: HitProps) {
  return (
    <div className="hit-container" onClick={() => onHitClick(hit)}>
      <div>
        <h2>
          <BiSolidChess />
          <Highlight attribute="White" hit={hit} /> vs{' '}
          <Highlight attribute="Black" hit={hit} />
          <MdOutlineSportsScore /> <Highlight attribute="Result" hit={hit} />
        </h2>
        <p>
          <BiCalendarEvent />
          <Highlight attribute="Event" hit={hit} />
          <br />
          <BiSolidMap />
          <Highlight attribute="Site" hit={hit} /> <br />
          <BsFillCalendarDateFill />
          <Highlight attribute="Date" hit={hit} />
        </p>
      </div>
      <div className="hit-image-container">
        <img
          src={`https://chess-board.fly.dev/?fen=${hit.LastPosition}&size=100&frame=false`}
          alt={hit.Game}
          className="hit-image"
        />
      </div>
    </div>
  );
}
