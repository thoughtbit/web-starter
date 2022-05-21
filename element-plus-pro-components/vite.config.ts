import { fileURLToPath, URL } from "url";
import { defineConfig, loadEnv } from "vite";
import createVitePlugins from "./build";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_ENV } = env;

  return {
    base: VITE_APP_ENV === "production" ? "/" : "/",
    plugins: createVitePlugins(env, command === "build"),
    resolve: {
      alias: {
        // 设置别名
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
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
      chunkSizeWarningLimit: 2000,
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
  };
});
