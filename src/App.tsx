import { useState } from 'react';
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
import algoliasearch from 'algoliasearch';
import { OpenPgn } from './Components/OpenPgn';

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: import.meta.env.VITE_TYPESENSE_API || 'xyz', // Be sure to use an API key that only allows search operations
    nodes: [
      {
        host: import.meta.env.VITE_TYPESENSE_HOST || 'localhost',
        port: parseInt(import.meta.env.VITE_TYPESENSE_PORT || '8108'),
        path: '', // Optional. Example: If you have your typesense mounted in localhost:8108/typesense, path should be equal to '/typesense'
        protocol: import.meta.env.VITE_TYPESENSE_PROTOCOL || 'http',
      },
    ],
    cacheSearchResultsForSeconds: 1 * 60, // Cache search results from server. Defaults to 2 minutes. Set to 0 to disable caching.
  },
  additionalSearchParameters: {
    query_by: 'Game,embedding,White,Black',
    exclude_fields: 'embedding',
  },
});

const algoliaSearchClient = import.meta.env.VITE_ALGOLIA_APP_ID
  ? algoliasearch(
      import.meta.env.VITE_ALGOLIA_APP_ID,
      import.meta.env.VITE_ALGOLIA_KEY
    )
  : undefined;

const searchClient =
  algoliaSearchClient || typesenseInstantsearchAdapter.searchClient;

export default function App() {
  const [game, setGame] = useState<any>();
  const [displayMode, setDisplayMode] = useState<string>('card');

  const handleHitClick = (item: any) => {
    setGame(item);
  };
  const indexName =
    import.meta.env.VITE_ALGOLIA_INDEX ||
    import.meta.env.VITE_INDEX_NAME ||
    'chessgames';
  const handleModeChange = (type: string) => {
    setDisplayMode(type);
  };
  const yearAttribute = import.meta.env.VITE_ALGOLIA_APP_ID ? 'year' : 'Year';
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indexName}
      insights={false}
    >
      <Configure hitsPerPage={50} />
      <header className="header-bg flex justify-center items-center min-height-[170px] p-2 bg-opacity-50 bg-white bg-contain pt-[150px]">
        <SearchBox
          placeholder="Search keywork (ie: Magnus vs Hiraku)"
          className="w-3/4 mb-8"
        />
      </header>

      <div className="flex w-full p-4">
        <div className="w-3/12 pr-2 lg:w-2/12">
          <div className="" data-layout="desktop">
            <ClearRefinements />
          </div>

          <Panel header="Year">
            <RefinementList
              attribute={yearAttribute}
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
              <DisplaySelector
                onChange={handleModeChange}
                mode={displayMode as any}
              />
              <OpenPgn onGameLoad={(g) => setGame(g)} />
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
          <GameViewer
            data={
              {
                ...game,
                Moves: game.Moves || game.moves,
                ECO: game.eco || game.ECO,
              } as any
            }
          ></GameViewer>
        </Modal>
      )}
    </InstantSearch>
  );
}
