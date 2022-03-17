/// <reference types="vitest" />

import { defineConfig, loadEnv } from 'vite';
import type { UserConfig, ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import windiCSS from 'vite-plugin-windicss';
import svgLoader from 'vite-svg-loader';
import { createHtmlPlugin } from 'vite-plugin-html';
import dayjs from 'dayjs';
import { resolve } from 'path';
import pkg from './package.json';

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

// https://vitejs.dev/config/
export default defineConfig((config: ConfigEnv): UserConfig => {
  const viteEnv = loadEnv(config.mode, `.env.${config.mode}`);

  return {
    mode: 'development',
    plugins: [
      react(),
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
      windiCSS(),
      svgLoader({ svgoConfig: {} }),
      createHtmlPlugin({
        minify: false,
        /**
         * After writing entry here, you will not need to add script tags in `index.html`, the original tags need to be deleted
         * @default src/main.tsx
         */
        entry: '/src/main.tsx',
        /**
         * If you want to store `index.html` in the specified folder, you can modify it, otherwise no configuration is required
         * @default index.html
         */
        template: 'public/index.html',

        /**
         * Data that needs to be injected into the index.html ejs template
         */
        inject: {
          data: {
            title: 'index',
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
    base: './',
    resolve: {
      alias: [
        {
          find: /^~/,
          replacement: '',
        },
        {
          find: '@',
          replacement: resolve(__dirname, 'src'),
        },
      ],
      // 可以忽略的后缀
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.mjs'],
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
      preprocessorOptions: {
        scss: {
          charset: false,
        },
      },
    },
    server: {
      // 设置服务启动时是否自动打开浏览器
      open: true,
      // 服务器监听的 IP 地址，默认 0.0.0.0 监听全部的
      host: '0.0.0.0',
      // 设置服务启动端口号
      port: 4000,
      // 允许跨域
      cors: true,
      // 是否开启 https
      https: false,
      // 设置代理，根据项目实际情况配置
      proxy: {
        // 选项写法
        '/api': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        // 正则表达式写法
        '^/fallback/.*': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/fallback/, ''),
        },
        // 使用 proxy 实例
        // '/api': {
        //   target: "http://jsonplaceholder.typicode.com",
        //   changeOrigin: true,
        //   configure: (proxy, options) => {
        //     // proxy 是 'http-proxy' 的实例
        //   },
        // },
      },
    },
  };
});
