import { defineConfig } from "vite";
import type { ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import dayjs from "dayjs";
import { resolve } from "path";
import { createElementPlusResolver, createHtml, createSvgLoader, createSvgIcons } from "./../plugins";
import pkg from "./../../package.json";

export default (configEnv: ConfigEnv, viteEnv: Record<string, string>) => {
  const { dependencies, devDependencies, name, version } = pkg;
  const __APP_INFO__ = {
    pkg: { dependencies, devDependencies, name, version },
    lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  };
  const cmd = process.cwd();
  const { command, mode } = configEnv;
  const { VITE_APP_BASE_URL, VITE_APP_NAME } = viteEnv;

  return defineConfig({
    base: VITE_APP_BASE_URL,
    root: cmd,
    plugins: [
      vue(),
      vueJsx(),
      createElementPlusResolver(),
      createSvgLoader(),
      createSvgIcons(command === "build"),
      createHtml(VITE_APP_NAME),
    ],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "../../src"),
        },
        {
          find: "assets",
          replacement: resolve(__dirname, "../../src/assets"),
        },
        {
          find: "vue-i18n",
          replacement: "vue-i18n/dist/vue-i18n.cjs.js", // Resolve the i18n warning issue
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
      __APP_ENV__: JSON.stringify(mode),
      __APP_INFO__: JSON.stringify(__APP_INFO__),
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
