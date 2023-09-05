import React from 'react';
import { Highlight, useInfiniteHits, Snippet } from 'react-instantsearch';

export function InfiniteHits(props) {
  const { hits } = useInfiniteHits(props);

  return (
    <div className="ais-InfiniteHits">
      <ul className="ais-InfiniteHits-list">
        {hits.map((hit) => (
          <li key={hit.objectID} className="ais-InfiniteHits-item">
            <article>
              <h2>
                <Highlight attribute="White" hit={hit} />
              </h2>
              <p>
                <Snippet attribute="Black" hit={hit} />
              </p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
