import { defineConfig } from "vite";
import type { ConfigEnv } from "vite";
import eslint from "vite-plugin-eslint";
import Inspect from "vite-plugin-inspect";
import configMockPlugin from "./build/plugins/mock";

export default (config: ConfigEnv) => {
  const isBuild = config.command === "build";
  return defineConfig({
    mode: "development",
    server: {
      // 服务器监听的 IP 地址，默认 0.0.0.0 监听全部的
      host: "0.0.0.0",
      // // 设置服务启动端口号
      // port: 3000,
      // 设置服务启动时是否自动打开浏览器
      open: true,
      // 允许跨域
      cors: true,
      // 是否开启 https
      https: false,
      fs: {
        // 限制为工作区 root 路径以外的文件的访问
        strict: true,
      },
    },
    plugins: [
      configMockPlugin(isBuild),
      eslint({
        cache: false,
      }),
      // https://github.com/antfu/vite-plugin-inspect
      // Visit http://localhost:3000/__inspect/ to see the inspector
      Inspect(),
    ],
  });
};
