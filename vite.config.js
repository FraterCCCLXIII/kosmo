// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 12000,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'X-Frame-Options': 'ALLOWALL'
    },
    allowedHosts: true,
    hmr: {
      clientPort: 12000,
      host: 'work-1-sclrpukjorzfitga.prod-runtime.all-hands.dev',
      protocol: 'wss'
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
});