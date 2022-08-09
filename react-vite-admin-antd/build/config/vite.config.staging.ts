import { defineConfig } from "vite";
import type { ConfigEnv } from "vite";
import { resolve } from "path";
import { createLegacy, createMocks, createCompress, createImagemin } from "./../plugins";
import pkg from "./../../package.json";

export default (configEnv: ConfigEnv, _: Record<string, string>) => {
  const { name, version } = pkg;
  const { command } = configEnv;

  const banner = `/*!
  * ${name} v${version} ${new Date()}
  * (c) 2022 @moocss.
  * Released under the MIT License.
  */`;

  const isBuild = command === "build";

  return defineConfig({
    plugins: [createLegacy(), createMocks(isBuild), createCompress("gzip"), createImagemin()],
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
