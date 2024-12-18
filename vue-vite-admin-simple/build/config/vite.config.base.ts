import { resolve } from "path";
import { defineConfig } from "vite";
import type { ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import unocss from "unocss/vite";

import { createHtml, createSvgLoader, createSvgIcons } from "./../plugins";

// @ts-ignore
export default (configEnv: ConfigEnv, viteEnv: Record<string, string>) => {
  const cmd = process.cwd();
  const { VITE_APP_BASE_URL, VITE_APP_NAME } = viteEnv;
  const { command } = configEnv;
  return defineConfig({
    base: VITE_APP_BASE_URL,
    root: cmd,
    plugins: [vue(), vueJsx(), unocss(), createSvgLoader() ,createSvgIcons(command === "build"), createHtml(VITE_APP_NAME)],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "../../src"),
        },
        {
          find: "vue",
          replacement: "vue/dist/vue.esm-bundler.js", // compile template
        },
      ],
      // 可以忽略的后缀
      extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue", ".mjs"],
    },
    define: {
      "process.env": {},
    },
    css: {
      modules: {
        localsConvention: "camelCaseOnly",
      },
      preprocessorOptions: {
        scss: {
          charset: false,
          // additionalData 的内容会在每个 scss 文件的开头自动注入
          additionalData: `@use "@/assets/styles/element/index.scss" as *;`,
        },
      },
    },
  });
};
