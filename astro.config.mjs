// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://thefreetools.eu',
  trailingSlash: 'always',
  integrations: [preact(), sitemap()],
  build: {
    // Inline small stylesheets so the first paint needs no extra request.
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
});
