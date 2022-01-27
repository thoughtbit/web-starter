/// <reference types="vitest" />

import { defineConfig, loadEnv } from "vite";
import type { UserConfig, ConfigEnv, PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteMockServe } from "vite-plugin-mock";
import { minifyHtml, injectHtml }  from "vite-plugin-html";
import svgLoader from "vite-svg-loader";
import styleImport from "vite-plugin-style-import";
import dayjs from "dayjs";
import { resolve } from "path";
import pkg from "./package.json";

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
};

// html 模板处理
const html =  (config: ConfigEnv): PluginOption[] => {
  const viteEnv = loadEnv(config.mode, `.env.${config.mode}`);

  return [
    minifyHtml(),
    injectHtml({
      injectData: {
        appName: viteEnv.VITE_APP_NAME,
      }
    })
  ];
};

// https://vitejs.dev/config/
export default defineConfig((config: ConfigEnv): UserConfig => {
  return {
    mode: "mock",
    plugins: [
      vue(),
      vueJsx(),
      // 修改vant皮肤
      styleImport({
        libs: [
          {
            libraryName: "vant",
            esModule: true,
            resolveStyle: (name) => `vant/es/${name}/style/less`,
          },
        ],
      }),
      viteMockServe({
        ignore: /^\_/,
        mockPath: "mocks",
        localEnabled: true, // 开发
        prodEnabled: false, // 生产
        watchFiles: true, // 监视文件更改
        injectCode: `
          import { setupProdMockServer } from './../mocks/_setupMock';
          setupProdMockServer();
        `,
      }),
      svgLoader({ svgoConfig: {} }),
      ...html(config),
    ],
    base: "./",
    resolve: {
      alias: [
        {
          find: /^~/,
          replacement: "",
        },
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
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    css: {
      modules: {
        localsConvention: "camelCaseOnly",
      },
      preprocessorOptions: {
        // 修改vant皮肤
        less: {
          javascriptEnabled: true,
          modifyVars: {
            "font-size-xs": "11px",
            "font-size-sm": "13px",
            "font-size-md": "15px",
            "font-size-lg": "17px",
            "action-bar-button-danger-color": "#7232dd",
            "action-bar-button-warning-color": "#3eaf7c",
          },
        },
        scss: {
          charset: false,
        },
      },
    },
    test: {
      globals: true,
      environment: "happy-dom",
      transformMode: {
        web: [/.[tj]sx$/, /.vue$/],
      },
    },
  };
});
