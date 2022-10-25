import type { PiniaPluginContext } from '@mpxjs/pinia';

export function onStoreActionPlugin({ store }: PiniaPluginContext) {
  store.$onAction(({ store, args, after, onError }) => {
    after((name) => {
      console.error('after', name, store, args);
    });

    onError((error) => {
      console.log('onError', error);
    });
  }, false);
}
