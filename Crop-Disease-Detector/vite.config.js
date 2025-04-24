import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// vite.config.js
export default defineConfig({
  root: './src/FrontEnd/src',
  plugins: [react()],
  build: {
    outDir: 'dist', 
  },
  server: {
    allowedHosts: ['.replit.dev', "11bb699b-6719-4c45-bae2-7ba84839928d-00-24ierxhyorx53.pike.replit.dev", "11bb699b-6719-4c45-bae2-7ba84839928d-00-24ierxhyorx53.pike.replit.dev"],
    port: 5173,             
    strictPort: true,
    hmr: {
      clientPort: 443,
    },
    host: '0.0.0.0',
  }
});
