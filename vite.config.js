// Vite config: sorts the build into css/, js/, fonts/ and img/ instead of one flat assets/ folder,
// and keeps the <head> order of index.html in the built page.
import { defineConfig } from 'vite';

const FONT = /\.(woff2?|ttf|otf)$/;

function assetFolder(name = '') {
  if (name.endsWith('.css')) return 'css';
  if (FONT.test(name)) return 'fonts';
  return 'img';
}

// Vite appends the built JS and CSS tags to the end of <head>. This puts them back under the
// "Scripts and styles" comment, where index.html has them: before preloads and meta tags.
function keepHeadOrder() {
  const BUILT_TAGS = /[ \t]*<(?:script type="module"|link rel="stylesheet") crossorigin[^>]*>(?:<\/script>)?\n/g;
  const ANCHOR = /([ \t]*)<!-- Scripts and styles -->\n/;

  return {
    name: 'keep-head-order',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const tags = html.match(BUILT_TAGS);
        const anchor = html.match(ANCHOR);
        if (!tags || !anchor) return html;
        const indent = anchor[1];
        const moved = tags.map((tag) => indent + tag.trim() + '\n').join('');
        return html.replace(BUILT_TAGS, '').replace(ANCHOR, (line) => line + moved);
      },
    },
  };
}

export default defineConfig({
  plugins: [keepHeadOrder()],
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
