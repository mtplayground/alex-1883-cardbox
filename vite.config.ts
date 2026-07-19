import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: './',
  plugins: [react()],
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
  },
  build: {
    assetsDir: 'assets',
    emptyOutDir: true,
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
  },
  preview: {
    host: '0.0.0.0',
    port: 8080,
    allowedHosts: true,
  },
});
