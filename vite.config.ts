import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
    /** Локально fetch('/api/deals') → tipa без CORS (как в проде за nginx). */
    proxy: {
      '/api/deals': {
        target: 'https://tipa.uchetgram.ru',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    minify: 'esbuild',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        /**
         * React / router / Helmet отдельно от прикладного кода.
         * framer-motion + lucide — самые тяжёлые UI-зависимости.
         */
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('framer-motion')) return 'framer-motion';
          if (id.includes('lucide-react')) return 'lucide';
          if (id.includes('react-router')) return 'react-router';
          if (id.includes('react-helmet-async')) return 'react-helmet-async';
          if (id.includes('react-dom') || id.includes('/react/')) return 'react';
        },
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'public',
      filename: 'sw.js',
      includeAssets: ['pwa-maskable.svg', 'logotip.svg', 'robots.txt', 'sitemap.xml'],
      injectManifest: {
        minify: false,
      },
      manifest: {
        name: 'uchetgram.ru',
        short_name: 'uchetgram.ru',
        description: 'CRM, ERP и автоматизация бизнеса. MAX и Telegram — в одном контуре',
        theme_color: '#1356A3',
        background_color: '#f8fafc',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/pwa-maskable.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
