import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { RUTAS_SIN_INDEXAR } from './src/lib/seo.js';

export default defineConfig({
  site: 'https://facundocorbalan.com',
  integrations: [
    sitemap({
      filter: (url) => !RUTAS_SIN_INDEXAR.some((ruta) => url.endsWith(ruta)),
    }),
  ],
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
});
