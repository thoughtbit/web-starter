/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  esbuild: {
    jsxInject: "import React from 'react'",
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [resolve(__dirname, 'src/tests/setup.ts')],
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
  },
});
