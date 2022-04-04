import { defineConfig } from "vite";
import type { ConfigEnv } from "vite";
import eslint from "vite-plugin-eslint";

export default (config: ConfigEnv) => {
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
      // 设置代理，根据项目实际情况配置
      proxy: {
        // 选项写法
        "/api": {
          target: "http://jsonplaceholder.typicode.com",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        // 正则表达式写法
        "^/fallback/.*": {
          target: "http://jsonplaceholder.typicode.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/fallback/, ""),
        },
        // 使用 proxy 实例
        // "/api": {
        //   target: "http://jsonplaceholder.typicode.com",
        //   changeOrigin: true,
        //   configure: (proxy, options) => {
        //     // proxy 是 'http-proxy' 的实例
        //   },
        // },
      },
    },
    plugins: [
      eslint({
        cache: false,
      }),
    ],
  });
};
