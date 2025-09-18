import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // FIX: The explicit call to process.cwd() causes a TypeScript type error.
      // `path.resolve` uses the current working directory by default, so it can be safely removed.
      '@': path.resolve('src'),
    },
  },
});