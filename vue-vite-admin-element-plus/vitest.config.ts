/// <reference types="vitest" />

import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [Vue(), VueJsx()],
  // https://github.com/vitest-dev/vitest
  test: {
    globals: true,
    environment: "happy-dom",
    transformMode: {
      web: [/.[tj]sx$/, /.vue$/],
    },
    deps: {
      inline: ["@vue", "@vueuse"],
    },
  },
});
