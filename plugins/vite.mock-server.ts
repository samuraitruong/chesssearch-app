// vite.mock-server.ts
// this use on localhost when no typesense server running
import { Plugin } from 'vite';
import fs from 'fs';

function createMockServerPlugin(): Plugin {
  return {
    name: 'mock-server',
    configureServer({ middlewares }) {
      middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/multi_search')) {
          res.setHeader('Content-Type', 'application/json');
          res.end(fs.readFileSync('./plugins/sample.json', 'utf8'));
          return;
        }
        next();
      });
    },
  };
}

export default createMockServerPlugin;
