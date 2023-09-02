import type { Hit } from 'instantsearch.js';
import React from 'react';
import { BiLocationPlus } from 'react-icons/bi';
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
          <Highlight attribute="White" hit={hit} /> vs{' '}
          <Highlight attribute="Black" hit={hit} />
          ( <Highlight attribute="Result" hit={hit} /> )
        </h2>
        <p>
          <BiLocationPlus />
          <Highlight attribute="Event" hit={hit} />
          <br />
          <Highlight attribute="Site" hit={hit} /> <br />
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
