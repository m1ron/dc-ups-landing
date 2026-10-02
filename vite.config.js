// Vite config: sorts the build into css/, js/, fonts/ and img/ instead of one flat assets/ folder.
import { defineConfig } from 'vite';

const FONT = /\.(woff2?|ttf|otf)$/;

function assetFolder(name = '') {
  if (name.endsWith('.css')) return 'css';
  if (FONT.test(name)) return 'fonts';
  return 'img';
}

export default defineConfig({
  build: {
    rolldownOptions: {
      output: {
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (asset) => `${assetFolder(asset.names?.[0])}/[name]-[hash][extname]`,
      },
    },
  },
});
