import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.jsx'],
      refresh: true,
    }),
    react(),
  ],
  server: {
    https: false,
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
