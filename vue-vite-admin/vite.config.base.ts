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
  const root = process.cwd();
  const viteEnv = loadEnv(config.mode, root);

  return defineConfig({
    base: viteEnv.VITE_APP_BASE_URL,
    plugins: [
      vue({
        // https://vuejs.org/guide/extras/reactivity-transform.html
        // 开启 Reactivity 转换 [$, $ref, $computed, $toRef 等], 实验阶段.
        // 使用 vue/macros 类库, 可按需引入 import { $, $ref, $computed, $toRef } from 'vue/macros';
        reactivityTransform: true,
      }),
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
      // 例如: 后缀为index.module.scss的样式文件自动应用 CSS Modules
      // 使用: import styles from './index.module.scss';
      modules: {
        // generateScopedName 属性来对生成的类名进行自定义; 其中，name 表示当前文件名，local 表示类名
        generateScopedName: "[name]__[local]___[hash:base64:5]",
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
