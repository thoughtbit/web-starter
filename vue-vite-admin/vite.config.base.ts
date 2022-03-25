import { resolve } from "path";
import { loadEnv, defineConfig } from "vite";
import type { ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import legacy from "@vitejs/plugin-legacy";
import windiCss from "vite-plugin-windicss";
import { createHtmlPlugin } from "vite-plugin-html";
import svgLoader from "vite-svg-loader";
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
      legacy({
        targets: ["ie >= 11"],
        additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
      }),
      windiCss(),
      svgLoader({ svgoConfig: {} }),
      createHtmlPlugin({
        minify: true,
        /**
         * After writing entry here, you will not need to add script tags in `index.html`, the original tags need to be deleted
         * @default src/main.tsx
         */
        entry: "/src/main.ts",
        /**
         * If you want to store `index.html` in the specified folder, you can modify it, otherwise no configuration is required
         * @default index.html
         */
        template: "public/index.html",

        /**
         * Data that needs to be injected into the index.html ejs template
         */
        inject: {
          data: {
            title: "index",
            appName: viteEnv.VITE_APP_NAME,
            // injectScript: `<script src="./inject.js"></script>`,
          },
          // tags: [
          //   {
          //     injectTo: 'body-prepend',
          //     tag: 'div',
          //     attrs: {
          //       id: 'tag',
          //     },
          //   },
          // ],
        },
      }),
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
        },
      },
    },
  });
};
