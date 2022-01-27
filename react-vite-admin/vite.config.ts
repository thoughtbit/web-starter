import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import windiCSS from "vite-plugin-windicss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ["ie >= 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
    
    windiCSS(),
  ],
  base: "./",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "~": resolve(__dirname, "./src"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".mjs"],
  },
  envPrefix: "APP_",
  /*
  server: {
    // 服务器监听的 IP 地址，默认 0.0.0.0 监听全部的
    host: '0.0.0.0',
    // 设置服务启动端口号
    port: 9000,
    // 设置服务启动时是否自动打开浏览器
    open: true,
    // 允许跨域
    cors: true,
    // 是否开启 https
    https: false,
    // 设置代理，根据项目实际情况配置
    proxy: {
      '/api': {
        target: 'http://api.moocss.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/api/', '/')
      }
    }
  }*/
});
