import type { Hit } from 'instantsearch.js';
import React from 'react';
import { Highlight } from 'react-instantsearch';

type HitProps = {
  hit: Hit;
  onHitClick: (item: any) => void;
};

export function TableHit({ hit, onHitClick }: HitProps) {
  return (
    <div
      className="flex w-full flex-row justify-between"
      onClick={() => onHitClick(hit)}
    >
      <div className="flex-1 pr-2">
        <Highlight attribute="White" hit={hit} />
      </div>
      <div className="flex-1 pr-2">
        <Highlight attribute="Black" hit={hit} />
      </div>
      <div className="flex-1 text-center">
        <Highlight attribute="Result" hit={hit} />
      </div>
      <div className="flex-1 pr-2">
        <Highlight attribute="Event" hit={hit} />
      </div>
      <div className="flex-1 pr-2">
        <Highlight attribute="Site" hit={hit} />
      </div>
      <div className="flex-1 text-right">
        <Highlight attribute="Date" hit={hit} />
      </div>
    </div>
  );
}
