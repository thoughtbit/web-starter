import type { App } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { useUserStore } from "./modules/user";
import { useAppStore } from "./modules/app";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// 注册全局状态
const store: any = {};
export const registerStore = () => {
  store.app = useAppStore();
  store.user = useUserStore();
};

export function setupStore(app: App<Element>) {
  app.use(pinia);
  registerStore();
}

export function useStore() {
  return store;
}

export { useAppStore, useUserStore };

export default pinia;
