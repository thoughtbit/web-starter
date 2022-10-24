import { getCurrentInstance, nextTick, onBeforeMount } from '@mpxjs/core';
import type { Fn } from '../types';

/**
 * Call onBeforeMount() if it's inside a component lifecycle, if not, just call the function
 *
 * @param fn
 * @param sync if set to false, it will run in the nextTick() of Vue
 */
export function tryOnBeforeMount(fn: Fn, sync = true) {
  if (getCurrentInstance()) onBeforeMount(fn);
  else if (sync) fn();
  else nextTick(fn);
}
