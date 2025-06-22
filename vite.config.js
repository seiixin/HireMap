import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

// Check if the current environment is production
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  base: isProduction ? 'https://hiremap-production.up.railway.app/build/' : '/build/',

  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.jsx'],
      refresh: true,
    }),
    react(),
  ],

  server: {
    https: false, // For local dev
    host: true,
  },

  build: {
    manifest: true,
    outDir: 'public/build',
    rollupOptions: {
      input: ['resources/css/app.css', 'resources/js/app.jsx'],
    },
  },
});
