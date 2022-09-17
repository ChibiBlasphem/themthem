/// <reference types="vitest" />

import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      input: {
        themthem: resolve(__dirname, 'src/index.ts'),
        component: resolve(__dirname, 'src/component.ts'),
        global: resolve(__dirname, 'src/global.ts'),
      },
      output: {
        preserveModules: true,
        entryFileNames: ({ name: filename }) => {
          return `${filename}.[format].js`;
        },
      },
    },
  },
});
