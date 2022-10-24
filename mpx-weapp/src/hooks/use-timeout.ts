import type { ComputedRef } from '@mpxjs/core';
import { computed } from '@mpxjs/core';
import type { UseTimeoutFnOptions } from './use-timeout-fn';
import { useTimeoutFn } from './use-timeout-fn';
import type { Fn, Stoppable } from './types';

export interface UseTimeoutOptions<Controls extends boolean> extends UseTimeoutFnOptions {
  /**
   * Expose more controls
   *
   * @default false
   */
  controls?: Controls;
  /**
   * Callback on timeout
   */
  callback?: Fn;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

/**
 * Update value after a given time with controls.
 *
 * @see   {@link https://vueuse.org/useTimeout}
 * @param interval
 * @param options
 */
export function useTimeout(interval?: number, options?: UseTimeoutOptions<false>): ComputedRef<boolean>;
export function useTimeout(
  interval: number,
  options: UseTimeoutOptions<true>
): { ready: ComputedRef<boolean> } & Stoppable;
export function useTimeout(interval = 1000, options: UseTimeoutOptions<boolean> = {}) {
  const { controls: exposeControls = false, callback } = options;

  const controls = useTimeoutFn(callback ?? noop, interval, options);

  const ready = computed(() => !controls.isPending.value);

  if (exposeControls) {
    return {
      ready,
      ...controls,
    };
  } else {
    return ready;
  }
}

/*
const { ready, start, stop } = useTimeout(1000, { controls: true })
console.log(ready.value) // false

await promiseTimeout(1200)

console.log(ready.value) // true
*/
