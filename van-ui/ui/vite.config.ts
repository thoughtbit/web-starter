/// <reference types="histoire" />

import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { HstVue } from '@histoire/plugin-vue'
import unocss from 'unocss/vite'
import dts from 'vite-plugin-dts'

const IcIconDataPath = path.resolve(__dirname, './src/constants/ic-icons.ts')

export default defineConfig({
  plugins: [
    vue(),
    unocss(),
    dts({
      cleanVueFileName: true,
      include: ['src', 'theme'],
      outDir: 'dist/types',
    }),
    {
      // must mark as `@unocss-include`
      name: 'vue-devtools-next-ui-auto-gen-unocss-include',
      closeBundle() {
        ;['index.js', 'index.cjs'].forEach((file) => {
          const path = `./dist/${file}`
          const content = readFileSync(path, 'utf-8')
          writeFileSync(path, `// @unocss-include\n\n${content}`)
        })
      },
    },
  ],
  build: {
    rollupOptions: {
      external: ['vue', 'unocss', 'floating-vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
          if (id === IcIconDataPath) {
            return 'ic-icons-data'
          }
        },
      },
    },
    lib: {
      entry: {
        index: 'src/index.ts',
        theme: 'theme/index.ts',
      },
      formats: ['es', 'cjs'],
    },
  },
  histoire: {
    setupCode: [
      'import "uno.css"',
    ],
    theme: {
      title: 'Vue-Devtools-Next-UI',
    },
    defaultStoryProps: {
      layout: {
        type: 'grid',
        width: 320,
      },
      responsiveDisabled: true,
      autoPropsDisabled: true,
    },
    plugins: [
      HstVue(),
    ],
  },
})
