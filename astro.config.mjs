import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jdeal.app',
  integrations: [
    react(),
    tailwind(),
    sitemap()
  ],
  output: 'static',
  build: {
    assets: '_astro'
  },
  vite: {
    optimizeDeps: {
      include: ['react', 'react-dom']
    }
  }
});