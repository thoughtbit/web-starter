import type { PiniaPluginContext } from '@mpxjs/pinia';

export function onStoreActionPlugin({ store }: PiniaPluginContext) {
  console.log('---->', store);
}
