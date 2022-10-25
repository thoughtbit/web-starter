import type { Mpx } from '@mpxjs/core';
import { createPinia } from '@mpxjs/pinia';
import { useAppStore } from './modules/app';
import { useUserStore } from './modules/user';
import { useErrorStore } from './modules/error';
import { onStoreActionPlugin } from './plugins';

// 注册全局状态
const store: any = {};
export function registerStore() {
  store.app = useAppStore();
  store.user = useUserStore();
  store.error = useErrorStore();
}

export function setupStore(mpx: Mpx) {
  const pinia = createPinia();
  pinia.use(onStoreActionPlugin)
  mpx.use(pinia);
  registerStore();
}

export function useStore() {
  return store;
}

export { useUserStore, useAppStore, useErrorStore };
