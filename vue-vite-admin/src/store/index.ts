import type { App } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { useUserStore } from "./modules/user";
import { useAppStore } from "./modules/app";
import { useTabBarStore } from "./modules/tab-bar";
import { useMenuStore } from "./modules/menu";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// 注册全局状态
const store: any = {};
export const registerStore = () => {
  store.app = useAppStore();
  store.user = useUserStore();
  store.menu = useMenuStore();
  store.tabbar = useTabBarStore();
};

export function setupStore(app: App<Element>) {
  app.use(pinia);
  registerStore();
}

export function useStore() {
  return store;
}
export { useAppStore, useUserStore, useTabBarStore, useMenuStore };

export default pinia;
