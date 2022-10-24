import { getCurrentInstance, onBeforeUnmount } from '@mpxjs/core';
import { Fn } from '../types';

/**
 * Call onBeforeUnmount() if it's inside a component lifecycle, if not, do nothing
 *
 * @param fn
 */
export function tryOnBeforeUnmount(fn: Fn) {
  if (getCurrentInstance()) onBeforeUnmount(fn);
}
