import { resolve } from "path";
import { loadEnv, defineConfig } from "vite";
import type { ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import legacy from "@vitejs/plugin-legacy";
import windiCss from "vite-plugin-windicss";
import svgLoader from "vite-svg-loader";
import configElementPlusResolverPlugin from "./build/plugins/element-plus-resolver";

import dayjs from "dayjs";
import pkg from "./package.json";

const { dependencies, devDependencies, name, version } = pkg;
const APP_INFO = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
};

export default (config: ConfigEnv) => {
  const cmd = process.cwd();
  const viteEnv = loadEnv(config.mode, `.env.${config.mode}`);
  return defineConfig({
    base: viteEnv.VITE_APP_BASE_URL,
    root: cmd,
    plugins: [
      vue(),
      vueJsx(),
      configElementPlusResolverPlugin(),
      legacy({
        targets: ["ie >= 11"],
        additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
      }),
      windiCss(),
      svgLoader({ svgoConfig: {} }),
    ],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "src"),
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
      __APP_INFO__: JSON.stringify(APP_INFO),
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
