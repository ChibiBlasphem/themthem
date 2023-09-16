/// <reference types="vitest" />

import { resolve } from 'path';
import { defineConfig } from 'vite';

const nodeExternals = ['fs', 'path', 'process', 'inquirer'];
const installedExternals = ['commander', 'inquirer'];

export default defineConfig({
  // optimizeDeps: {
  //   include: installedExternals,
  // },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      external: [...installedExternals, ...nodeExternals],
      input: {
        themthem: resolve(__dirname, 'src/index.ts'),
        component: resolve(__dirname, 'src/component.ts'),
        global: resolve(__dirname, 'src/global.ts'),
        cli: resolve(__dirname, 'src/cli/index.ts'),
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
