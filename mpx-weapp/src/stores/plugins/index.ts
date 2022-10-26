import type { PiniaPluginContext } from '@mpxjs/pinia';

export function onStoreActionPlugin(context: PiniaPluginContext) {
  context.store.$subscribe((mutation) => {
    // 响应 store 变更
    console.log(`[🍍 ${mutation.storeId}]: ${mutation.type}.`);
  });
  context.store.$onAction(({ name, store, args, after, onError }) => {
    after(() => {
      console.log('[🍍after:name]', name);
      console.log('[🍍after:store]', store);
      console.log('[🍍after:args]', args);
    });

    onError((error) => {
      console.error('[🍍onError]', error);
    });
  }, false);
}
