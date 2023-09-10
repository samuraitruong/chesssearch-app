import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';
import wasm from 'vite-plugin-wasm';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 100,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.indexOf('react-chessboard') >= 0) {
            return 'react-chessboard';
          }
          if (id.indexOf('react-chessboard') >= 0) {
            return 'react-chessboard';
          }
          if (id.indexOf('instantsearch') >= 0) {
            return 'search';
          }

          if (id.indexOf('icons') >= 0) {
            return 'icons';
          }
        },
      },
    },
  },
  server: {
    port: 1234,
  },
  plugins: [
    react(),
    svgLoader(),
    wasm(),
    mkcert(),
    {
      name: 'configure-response-headers',
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
          res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
          next();
        });
      },
    },
  ],
});
