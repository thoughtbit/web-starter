import process from 'node:process'
import type { ConfigEnv } from 'vitest/config'
import { defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'
import { createViteProxy } from './config/proxy'
import { setupVitePlugins } from './config/plugins'
import { convertEnv, getRootPath, getSrcPath } from './config/utils'

// https://vitejs.dev/config/
export default defineConfig((configEnv: ConfigEnv) => {
  const srcPath = getSrcPath()
  const rootPath = getRootPath()
  const isBuild = configEnv.command === 'build'
  const viteEnv = convertEnv(loadEnv(configEnv.mode, process.cwd()))
  const { VITE_PORT, VITE_USE_PROXY, VITE_PROXY_TYPE } = viteEnv
  return {
    plugins: setupVitePlugins(viteEnv, isBuild),
    server: {
      host: '0.0.0.0',
      port: VITE_PORT,
      open: false,
      proxy: createViteProxy(VITE_USE_PROXY, VITE_PROXY_TYPE as ProxyType),
    },
    build: {
      reportCompressedSize: false,
      sourcemap: false,
      chunkSizeWarningLimit: 1024, // chunk 大小警告的限制（单位kb）
      commonjsOptions: {
        ignoreTryCatch: false,
      },

    },
    resolve: {
      alias: {
        '~': rootPath,
        '@': srcPath,
      },
    },
    test: {
      environment: 'jsdom',
    },
  }
})
