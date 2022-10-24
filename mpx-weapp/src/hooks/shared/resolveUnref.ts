import { unref } from '@mpxjs/core';

import type { MaybeComputedRef } from '../types';

/**
 * Normalize value/ref/getter to `ref` or `computed`.
 */
export function resolveUnref<T>(r: MaybeComputedRef<T>): T {
  return typeof r === 'function' ? (r as any)() : unref(r);
}

/*
const foo = ref('hi')

const a = resolveUnref(0) // 0
const b = resolveUnref(foo) // 'hi'
const c = resolveUnref(() => 'hi') // 'hi'
*/
