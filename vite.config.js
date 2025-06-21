import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
  base: 'https://hiremap-production.up.railway.app/', // 🔥 force HTTPS
  plugins: [
    laravel({
      input: [
        'resources/css/app.css',
        'resources/js/app.jsx',
      ],
      refresh: true,
    }),
  ],
});
