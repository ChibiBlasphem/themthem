/// <reference types="vitest" />

import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'Themthem',
      fileName: (format) => `themthem.${format}.js`,
    },
  },
});
