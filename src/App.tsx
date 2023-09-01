import React, { useState } from 'react';
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';

import {
  Configure,
  ClearRefinements,
  DynamicWidgets,
  Stats,
  RefinementList,
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  SearchBox,
} from 'react-instantsearch';

import { Panel } from './Panel';

import type { Hit } from 'instantsearch.js';

import './App.css';
import { Modal } from './Components/Modal';
import { Replay } from './Components/Replay';

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: 'xyz', // Be sure to use an API key that only allows search operations
    nodes: [
      {
        host: 'localhost',
        port: 8108,
        path: '', // Optional. Example: If you have your typesense mounted in localhost:8108/typesense, path should be equal to '/typesense'
        protocol: 'http',
      },
    ],
    cacheSearchResultsForSeconds: 2 * 60, // Cache search results from server. Defaults to 2 minutes. Set to 0 to disable caching.
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  query_by is required.
  additionalSearchParameters: {
    query_by: 'Game,embedding,White,Black',
    exclude_fields: 'embedding,Pgn',
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

export function App() {
  const [game, setGame] = useState();
  const handleHitClick = (item) => {
    console.log(item);
    setGame(item);
  };
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="chessgames"
      insights={false}
    >
      <Configure hitsPerPage={20} />
      <header className="header">
        <SearchBox placeholder="" className="searchbox" />
      </header>

      <div className="container">
        <div className="search-panel">
          <div className="search-panel__filters">
            <h2>Filters</h2>

            <div className="clear-filters" data-layout="desktop">
              <ClearRefinements
                translations={{
                  reset: (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                      >
                        <g fill="none" fillRule="evenodd" opacity=".4">
                          <path d="M0 0h11v11H0z" />
                          <path
                            fill="#000"
                            fillRule="nonzero"
                            d="M8.26 2.75a3.896 3.896 0 1 0 1.102 3.262l.007-.056a.49.49 0 0 1 .485-.456c.253 0 .451.206.437.457 0 0 .012-.109-.006.061a4.813 4.813 0 1 1-1.348-3.887v-.987a.458.458 0 1 1 .917.002v2.062a.459.459 0 0 1-.459.459H7.334a.458.458 0 1 1-.002-.917h.928z"
                          />
                        </g>
                      </svg>
                      Clear filters
                    </>
                  ),
                }}
              />
            </div>

            <div className="clear-filters" data-layout="mobile"></div>
            <Panel header="Year">
              <RefinementList
                attribute="Year"
                searchable={true}
                // translations={{
                //   placeholder: 'Search for brands…',
                // }}
              />
            </Panel>
            <Panel header="Event">
              <RefinementList
                attribute="Event"
                searchable={true}
                // translations={{
                //   placeholder: 'Search for brands…',
                // }}
              />
            </Panel>
            <Panel header="White">
              <RefinementList
                attribute="White"
                searchable={true}
                // translations={{
                //   placeholder: 'Search for brands…',
                // }}
              />
            </Panel>

            <Panel header="Black">
              <RefinementList
                attribute="Black"
                searchable={true}
                // translations={{
                //   placeholder: 'Search for brands…',
                // }}
              />
            </Panel>

            <Panel header="Result">
              <RefinementList
                attribute="Result"
                searchable={true}
                // translations={{
                //   placeholder: 'Search for brands…',
                // }}
              />
            </Panel>

            <Panel header="ECO">
              <RefinementList
                attribute="ECO"
                searchable={true}
                // translations={{
                //   placeholder: 'Search for brands…',
                // }}
              />
            </Panel>
          </div>

          <div className="search-panel__results">
            <Stats className="stats" />
            <Hits
              hitComponent={(props) => (
                <Hit {...props} onHitClick={handleHitClick} />
              )}
            />

            <div className="pagination">
              <Pagination />
            </div>
          </div>
        </div>
      </div>
      {game && (
        <Modal onClose={() => setGame(undefined)}>
          <Replay data={game}></Replay>
        </Modal>
      )}
    </InstantSearch>
  );
}

type HitProps = {
  hit: Hit;
  onHitClick: (item: any) => void;
};

function Hit({ hit, onHitClick }: HitProps) {
  return (
    <div className="hit-container" onClick={() => onHitClick(hit)}>
      <div>
        <h1>
          <Highlight attribute="Event" hit={hit} />
        </h1>
        <p>
          <Highlight attribute="White" hit={hit} /> vs{' '}
          <Highlight attribute="Black" hit={hit} />
          ( <Highlight attribute="Result" hit={hit} /> )
        </p>
        <p>
          <Highlight attribute="Date" hit={hit} />
        </p>
        <p>
          <Highlight attribute="ECO" hit={hit} />
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
