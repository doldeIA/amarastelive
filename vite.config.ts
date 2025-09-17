import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // FIX: __dirname is not available in ES modules.
      // process.cwd() provides the project root directory where vite is run.
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
});