import { resolve, join } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mockServer from 'vite-plugin-mock-dev-server';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src'),
      },
    ],
    // 可以忽略的后缀
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.mjs'],
  },
  plugins: [
    mockServer({
      include: 'mock/**/*.mock.{ts,js,cjs,mjs,json,json5}',
      formidableOptions: {
        // 配置上传资源存放目录
        uploadDir: join(process.cwd(), '/uploads'),
        // 可修改上传资源名称
        filename: (name, ext, part) => {
          return part.originalFilename!;
        },
      },
      // 当需要构建一个小型mock服务时，可配置此项
      build: true,
    }),
    react(),
  ],
  // define 注入的变量， 在 mock文件中也可以使用
  define: {
    __IS_DEVELOPMENT__: JSON.stringify(mode === 'development'),
  },
  server: {
    // 仅在 proxy 中配置的 代理前缀， mock-dev-server 才会拦截并mock
    proxy: {
      '^/api': {
        target: '',
      },
    },
  },
}));
