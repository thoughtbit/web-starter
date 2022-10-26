import type { Mpx } from '@mpxjs/core';
import { createPinia } from '@mpxjs/pinia';

import { useAppStore } from './modules/app';
import { useUserStore } from './modules/user';
import { useErrorStore } from './modules/error';
import { onStoreActionPlugin } from './plugins';

export function setupStore(mpx: Mpx) {
  const pinia = createPinia();
  pinia.use(onStoreActionPlugin);
  mpx.use(pinia);
}

export { useUserStore, useAppStore, useErrorStore };
