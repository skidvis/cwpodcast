// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Make the files directory accessible as static assets
  outDir: './dist',
  publicDir: './public',
  // Add a custom asset directory for the MP3 files
  build: {
    assets: 'assets',
    assetsPrefix: '/'
  },
  // Configure site URL for RSS feed
  site: 'https://podcast.coveredwheel.com',
  // Configure static file handling
  vite: {
    build: {
      assetsInlineLimit: 0
    },
    server: {
      fs: {
        // Allow serving files from one level up (the files directory)
        allow: ['..']
      }
    }
  }
});
