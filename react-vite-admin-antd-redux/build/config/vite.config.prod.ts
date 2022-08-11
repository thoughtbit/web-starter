import { defineConfig } from "vite";
import type { ConfigEnv } from "vite";
import { createLegacy, createCompress, createImagemin } from "./../plugins";
import pkg from "./../../package.json";

export default (configEnv: ConfigEnv, viteEnv: Record<string, string>) => {
  const { name, version } = pkg;

  const banner = `/*!
  * ${name} v${version} ${new Date()}
  * (c) 2022 @moocss.
  * Released under the MIT License.
  */`;

  return defineConfig({
    plugins: [createLegacy(), createCompress("gzip"), createImagemin()],
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
      sourcemap: false,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          banner,
        },
      },
    },
  });
};
