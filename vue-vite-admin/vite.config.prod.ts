import { defineConfig, loadEnv } from "vite";
import type { ConfigEnv } from "vite";
import configCompressPlugin from "./build/plugins/compress";
import configVisualizerPlugin from "./build/plugins/visualizer";
import configImageminPlugin from "./build/plugins/imagemin";
import { configPwaConfig } from "./build/plugins/pwa";
import pkg from "./package.json";


const { name, version } = pkg;
const banner = `/*!
* ${name} v${version} ${new Date()}
* (c) 2022 @moocss.
* Released under the MIT License.
*/`;

export default (config: ConfigEnv) => {
  const viteEnv = loadEnv(config.mode, `.env.${config.mode}`);
  return defineConfig({
    mode: "production",
    plugins: [configCompressPlugin("gzip"), configVisualizerPlugin(), configImageminPlugin(), configPwaConfig(viteEnv)],
    build: {
      // // 指定混淆器 minify: boolean | 'terser' | 'esbuild', 默认为 Esbuild .
      // minify: "terser",
      // // 去除 console debugger
      // terserOptions: {
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: true,
      //   },
      // },

      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      sourcemap: false,
      rollupOptions: {
        output: {
          banner,
          manualChunks: {
            chart: ["echarts", "vue-echarts"],
            vue: ["vue", "vue-router", "pinia", "@vueuse/core", "vue-i18n"],
          },
        },
      },
      chunkSizeWarningLimit: 2000,
    },
    esbuild: {
      pure: ["console.log", "debugger"],
    },
    // 依赖优化选项
    optimizeDeps: {
      include: ["vue", "vue-router"],
      exclude: ["vue-demi"],
    },
  });
};
