import { defineConfig } from "vite";
import type { ConfigEnv } from "vite";

export default (configEnv: ConfigEnv, viteEnv: Record<string, string>) => {
  const { command } = configEnv;
  const { VITE_APP_API_URL, VITE_APP_API_URL_PREFIX } =  viteEnv;

  return defineConfig({
    server: {
      // 设置服务启动时是否自动打开浏览器
      open: true,
      // 服务器监听的 IP 地址，默认 0.0.0.0 监听全部的
      host: "0.0.0.0",
      // 设置服务启动端口号
      port: 3000,
      // 允许跨域
      cors: true,
      // 设置代理，根据项目实际情况配置
      proxy: {
        // 选项写法
        "/api": {
          // target: "http://jsonplaceholder.typicode.com",
          target: `${VITE_APP_API_URL}${VITE_APP_API_URL_PREFIX}`,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
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
  });
};
