import { resolve } from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "./src"),
      }
    ],
    // 可以忽略的后缀
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".mjs"],
  },
  plugins: [react()],
})
