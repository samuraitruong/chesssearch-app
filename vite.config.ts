import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';
import wasm from 'vite-plugin-wasm';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 1234,
  },
  plugins: [
    react(),
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
