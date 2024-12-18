import 'uno.css'
import 'nprogress/nprogress.css'
import '@/styles/reset.css'
import '@/styles/index.css'
import { createApp } from 'vue'
import type { VueQueryPluginOptions } from '@tanstack/vue-query'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  },
}
async function setupApp() {
  const app = createApp(App)
  await setupStore(app)
  await setupRouter(app)
  app.use(VueQueryPlugin, vueQueryPluginOptions).mount('#app')
}
setupApp()
