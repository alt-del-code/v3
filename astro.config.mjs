// @ts-check
import { defineConfig } from 'astro/config';


import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

import icon from 'astro-icon';
import keystatic from '@keystatic/astro';
import mdx from '@astrojs/mdx';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://alt-del-code.github.io',

  integrations: [
    react({
      include: ['**/react/*', '**/keystatic/*']
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    markdoc(),
    sitemap(),
    partytown(),
    icon({
      include: {
        lucide: ['*'],
        ph: ['*']
      }
    }),
    keystatic(),
    mdx()
  ],

  adapter: node({
    mode: 'standalone'
  }),

  build: {
    assets: '_assets'
  }
});