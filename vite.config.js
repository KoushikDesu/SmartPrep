import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures assets load correctly on GitHub Pages (/SmartPrep/) and custom domains
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
