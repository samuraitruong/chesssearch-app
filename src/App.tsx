import React, { useState } from 'react';
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import {
  Configure,
  ClearRefinements,
  Stats,
  RefinementList,
  Hits,
  InstantSearch,
  Pagination,
  SearchBox,
} from 'react-instantsearch';
import './App.css';
import { DisplaySelector } from './Components/DisplaySelector';

import { Panel } from './Components/Panel';
import { Hit } from './Components/Hit';
import { Modal } from './Components/Modal';
import { GameViewer } from './Components/GameViewer';
import { HitCard } from './Components/HitCard';
import { TableHit } from './Components/TableHit';

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: process.env.TYPESENSE_API || 'xyz', // Be sure to use an API key that only allows search operations
    nodes: [
      {
        host: process.env.TYPESENSE_HOST || 'localhost',
        port: parseInt(process.env.TYPESENSE_PORT || '8108'),
        path: '', // Optional. Example: If you have your typesense mounted in localhost:8108/typesense, path should be equal to '/typesense'
        protocol: 'http',
      },
    ],
    cacheSearchResultsForSeconds: 1 * 60, // Cache search results from server. Defaults to 2 minutes. Set to 0 to disable caching.
  },
  additionalSearchParameters: {
    query_by: 'Game,embedding,White,Black',
    exclude_fields: 'embedding',
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

export function App() {
  const [game, setGame] = useState();
  const [displayMode, setDisplayMode] = useState<any>('card');

  const handleHitClick = (item) => {
    setGame(item);
  };
  const indexName = process.env.INDEX_NAME || 'chessgames';
  const handleModeChange = (type) => {
    setDisplayMode(type);
  };
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indexName}
      insights={false}
    >
      <Configure hitsPerPage={20} />
      <header className="header-bg flex justify-center items-center min-height-[170px] p-2 bg-opacity-50 bg-white bg-contain pt-[150px]">
        <SearchBox
          placeholder="Search keywork (ie: Magnus vs Hiraku)"
          className="w-3/4 mb-8"
        />
      </header>

      <div className="flex w-full p-4">
        <div className="w-3/12 pr-2 lg:w-2/12">
          <div className="" data-layout="desktop">
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

        <div className="w-9/12 lg:w-10/12">
          <div className="flex w-full justify-between">
            <div className="w-1/2">
              <Stats className="mb-3" />
            </div>

            <div className="w-1/2 justify-end flex">
              <DisplaySelector onChange={handleModeChange} mode={displayMode} />
            </div>
          </div>
          {displayMode === 'card' && (
            <Hits
              className="w-full hits_card"
              hitComponent={(props) => (
                <HitCard {...props} onHitClick={handleHitClick} />
              )}
            />
          )}
          {displayMode === 'list' && (
            <Hits
              hitComponent={(props) => (
                <Hit {...props} onHitClick={handleHitClick} />
              )}
            />
          )}

          {displayMode === 'table' && (
            <Hits
              className="ais-Hits-table"
              hitComponent={(props) => (
                <TableHit {...props} onHitClick={handleHitClick} />
              )}
            />
          )}

          <div className="flex align-middle w-full justify-center pt-5 ">
            <Pagination />
          </div>
        </div>
      </div>
      {game && (
        <Modal onClose={() => setGame(undefined)}>
          <GameViewer data={game}></GameViewer>
        </Modal>
      )}
    </InstantSearch>
  );
}
