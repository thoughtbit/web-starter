import { ref } from '@mpxjs/core';
import type { ComputedRef, Ref } from '@mpxjs/core';
import { isClient } from '@/utils/util';
import type { Stoppable } from './types';
import { resolveUnref } from './shared/resolveUnref';
import { tryOnScopeDispose } from './shared/tryOnScopeDispose';

export interface UseTimeoutFnOptions {
  /**
   * Start the timer immediate after calling this function
   *
   * @default true
   */
  immediate?: boolean;
}

/**
 * Wrapper for `setTimeout` with controls.
 *
 * @param cb
 * @param interval
 * @param options
 */
export function useTimeoutFn(
  cb: (...args: unknown[]) => any,
  interval: ComputedRef<number> | number | Ref<number>,
  options: UseTimeoutFnOptions = {}
): Stoppable {
  const { immediate = true } = options;

  const isPending = ref(false);

  let timer: number | null = null;

  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function stop() {
    isPending.value = false;
    clear();
  }

  function start(...args: unknown[]) {
    clear();
    isPending.value = true;
    timer = setTimeout(() => {
      isPending.value = false;
      timer = null;

      // eslint-disable-next-line n/no-callback-literal
      cb(...args);
    }, resolveUnref(interval)) as unknown as number;
  }

  if (immediate) {
    isPending.value = true;
    if (isClient) start();
  }

  tryOnScopeDispose(stop);

  return {
    isPending,
    start,
    stop,
  };
}

/*
const { isPending, start, stop } = useTimeoutFn(() => {
 //
}, 3000)
*/
