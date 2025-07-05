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
  // devToolbar: {
  //   enabled: true,
  // },
  vite: {
    server: {
      allowedHosts: ['jdeal.app'],
      host: true
    },
    optimizeDeps: {
      include: ['react', 'react-dom']
    }
  }
});