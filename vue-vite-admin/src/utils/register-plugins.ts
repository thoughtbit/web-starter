import type { App } from "vue";

/*
// pinia plugin
import { App } from 'vue'
import { createPinia } from 'pinia'

export default (app: App) => {
  app.use(createPinia())
}

*/

export default (app: App, path: string = "./plugins/*.ts") => {
  register(app, import.meta.globEager(path));
};

function register(app: App, modules: Record<string, any>) {
  Object.entries(modules).map(([, module]) => {
    module.default(app);
  });
}
