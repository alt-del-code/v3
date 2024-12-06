// @ts-check
import { defineConfig } from 'astro/config';
import { visualizer } from 'rollup-plugin-visualizer';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import node from '@astrojs/node';
import icon from 'astro-icon';
import keystatic from '@keystatic/astro';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://alt-del-code.github.io',
  integrations: [
    react(),
    tailwind({
      // Ensure Tailwind processes all content
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
    mdx(),
  ],
  
  build: {
    assets: '_astro',
    inlineStylesheets: 'auto'
  },

  adapter: node({
    mode: 'standalone'
  }),

  // New Astro 5.0 configurations
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },

  image: {
    domains: [],
    remotePatterns: [{ protocol: "https" }],
    service: { entrypoint: 'astro/assets/services/sharp' }
  },

  vite: {
    build: {
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Keystatic chunks
            if (id.includes('@keystatic/core')) {
              if (id.includes('components')) {
                return 'keystatic-ui';
              }
              if (id.includes('api')) {
                return 'keystatic-api';
              }
              return 'keystatic-core';
            }
            
            // React and related packages
            if (id.includes('react') || id.includes('scheduler')) {
              return 'react-vendor';
            }
            
            // UI Components
            if (id.includes('@headlessui') || id.includes('@heroicons')) {
              return 'ui-components';
            }
            
            // Markdown processing
            if (id.includes('marked') || id.includes('remark') || 
                id.includes('rehype') || id.includes('mdx') || 
                id.includes('markdoc')) {
              return 'markdown';
            }
            
            // Icons
            if (id.includes('@iconify') || id.includes('astro-icon')) {
              return 'icons';
            }
            
            // Animation
            if (id.includes('aos')) {
              return 'aos';
            }
          }
        }
      }
    },
    plugins: [
      visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      })
    ]
  },

  output: 'static',
});