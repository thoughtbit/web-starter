import { defineConfig, loadEnv } from "vite";
import type { UserConfig, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import legacy from "@vitejs/plugin-legacy";
import { createHtmlPlugin } from "vite-plugin-html";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { createStyleImportPlugin, VantResolve } from "vite-plugin-style-import";
import { visualizer } from "rollup-plugin-visualizer";

import dayjs from "dayjs";
import { resolve } from "path";
import pkg from "./package.json";

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
};

const banner = `/*!
* ${name} v${version} ${new Date()}
* (c) 2022 @moocss.
* Released under the MIT License.
*/`;

// https://vitejs.dev/config/
export default defineConfig((config: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const viteEnv = loadEnv(config.mode, `.env.${config.mode}`);
  return {
    mode: "production",
    base: viteEnv.VITE_APP_BASE_URL,
    root,
    plugins: [
      vue(),
      vueJsx(),
      legacy({
        targets: ["ie >= 11"],
        additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
      }),
      createStyleImportPlugin({
        resolves: [VantResolve()],
        libs: [
          // If you don’t have the resolve you need, you can write it directly in the lib, or you can provide us with PR
          {
            libraryName: "vant",
            esModule: true,
            resolveStyle: (name) => `vant/es/${name}/style/less`,
          },
        ],
      }),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), "src/assets/icons/svgs")],
        symbolId: "icon-[dir]-[name]",
        // 'body-last' | 'body-first'
        inject: "body-first",
        svgoOptions: true,
      }),
      createHtmlPlugin({
        minify: false,
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
      visualizer({
        gzipSize: true,
        brotliSize: true,
      }),
    ],
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
      ],
      // 可以忽略的后缀
      extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue", ".mjs"],
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
          manualChunks(id) {
            // 将pinia的全局库实例打包进vendor, 避免和页面一起打包造成资源重复引入
            if (id.includes(resolve(__dirname, "/src/store/index.ts"))) {
              return "vendor";
            }
          },
        },
      },
    },
    // 依赖优化选项
    optimizeDeps: {
      include: ["vue", "vue-router"],
      exclude: [],
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
  };
});
