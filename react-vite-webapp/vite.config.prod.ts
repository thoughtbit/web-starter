import { defineConfig, loadEnv } from 'vite';
import type { UserConfig, ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import { createHtmlPlugin } from 'vite-plugin-html';
import windiCSS from 'vite-plugin-windicss';
import svgLoader from 'vite-svg-loader';
import { visualizer } from 'rollup-plugin-visualizer';
import dayjs from 'dayjs';
import { resolve } from 'path';
import pkg from './package.json';

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

const banner = `/*!
* ${name} v${version} ${new Date()}
* (c) 2022 @moocss.
* Released under the MIT License.
*/`;

// https://vitejs.dev/config/
export default defineConfig((config: ConfigEnv): UserConfig => {
  const viteEnv = loadEnv(config.mode, `.env.${config.mode}`);
  return {
    mode: 'production',
    plugins: [
      react(),
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
      windiCSS(),
      svgLoader({ svgoConfig: {} }),
      createHtmlPlugin({
        minify: true,
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
      visualizer({
        gzipSize: true,
        brotliSize: true,
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
    esbuild: {
      pure: viteEnv.VITE_APP_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    // 生产环境打包配置
    build: {
      minify: false,
      // 去除 console debugger
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      sourcemap: false,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          banner,
        },
      },
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
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
  };
});
