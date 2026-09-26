// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://thefreetools.eu',
  trailingSlash: 'always',
  integrations: [preact(), sitemap()],
  build: {
    // Inline CSS (~4 KB gzip) so the first paint needs no extra request.
    inlineStylesheets: 'always',
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
});
