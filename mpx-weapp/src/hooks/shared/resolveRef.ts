import { computed, ref } from '@mpxjs/core';
import type { ComputedRef, Ref } from '@mpxjs/core';
import type { MaybeComputedRef, MaybeRef } from '../types';

/**
 * Normalize value/ref/getter to `ref` or `computed`.
 */
export function resolveRef<T>(r: MaybeComputedRef<T>): ComputedRef<T>;
export function resolveRef<T>(r: MaybeRef<T>): Ref<T>;
export function resolveRef<T>(r: T): Ref<T>;
export function resolveRef<T>(r: MaybeComputedRef<T>) {
  return typeof r === 'function' ? computed<T>(r as any) : ref(r);
}

/*
const foo = ref('hi')

const a = resolveRef(0) // Ref<number>
const b = resolveRef(foo) // Ref<string>
const c = resolveRef(() => 'hi') // ComputedRef<string>
*/
