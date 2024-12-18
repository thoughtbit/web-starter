import { defineConfig } from "vite";
import type { ConfigEnv } from "vite";
import { createCompress, createVisualizer } from "./../plugins";

// @ts-ignore
export default (configEnv: ConfigEnv, viteEnv: Record<string, string>) => {
  return defineConfig({
    plugins: [createCompress("gzip"), createVisualizer()],
    // 生产环境打包配置
    build: {
      minify: true,
      // 去除 console debugger
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      // 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
      reportCompressedSize: false,
      sourcemap: false,
      commonjsOptions: {
        ignoreTryCatch: false,
      },
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        external: ["unocss"],
        output: {
          chunkFileNames: "js/[name].[hash].js",
          entryFileNames: "js/[name].[hash].js",
          assetFileNames: "[ext]/[name].[hash].[ext]",
          manualChunks: {
            "vendor-vue": ["vue", "vue-router", "pinia", "@vueuse/core"],
            "vendor-element-plus": ["element-plus", "@element-plus/icons-vue"],
            "vendor-echarts": ["echarts", "vue-echarts"],
            "vendor-libs": ["axios", "mockjs", "lodash"],
          },
        },
      },
    },
  });
};
