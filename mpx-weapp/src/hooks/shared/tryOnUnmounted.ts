import { getCurrentInstance, onUnmounted } from '@mpxjs/core';
import { Fn } from '../types';

/**
 * Call onUnmounted() if it's inside a component lifecycle, if not, do nothing
 *
 * @param fn
 */
export function tryOnUnmounted(fn: Fn) {
  if (getCurrentInstance()) onUnmounted(fn);
}
