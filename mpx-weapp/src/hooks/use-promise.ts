import { ref, shallowRef } from '@mpxjs/core';
import type { Ref } from '@mpxjs/core';
import { isBoolean, isObject } from '@/utils/util';

type PromiseType<T extends Promise<any>> = T extends Promise<infer R> ? R : never;

export interface PromiseResult<T extends Promise<any>, TR = PromiseType<T>, TError = any> {
  execute: (...args: Array<any>) => Promise<any>;
  promise: Ref<T | any>;
  result: Ref<TR | undefined | null>;
  loading: Ref<boolean>;
  error: Ref<TError | undefined>;
}

export interface PromiseOptions {
  // 立即执行request, 默认值为 false
  immediate?: boolean;

  // 使用 shallowRef, 避免深层递归转为响应性, 用于大型数据结构的性能优化, 默认值为 true
  shallow?: boolean;
}

export function usePromise<T extends Promise<any>>(
  fn: (...args: Array<any>) => T,
  options: PromiseOptions | boolean
): PromiseResult<T> {
  if (!fn) {
    throw new Error(`[usePromise] argument can't be '${fn}'`);
  }
  if (typeof fn !== 'function') {
    throw new Error(`[usePromise] expects function, but received ${typeof fn}`);
  }

  const [immediate, shallow] = isBoolean(options)
    ? [options, true]
    : isObject(options)
      ? [options.immediate, options.shallow]
      : [false, true];

  const loading = ref(false);
  const error = shallow ? shallowRef(null) : ref(null);
  const result = shallow ? shallowRef(null) : ref(null);
  const promise = ref();

  const execute = async (...args: any[]) => {
    loading.value = true;
    error.value = null;

    const currentPromise = (promise.value = fn(...args));
    await currentPromise
      .then((res: any) => {
        if (promise.value === currentPromise) {
          result.value = res;
        }
        return res;
      })
      .catch((err: any) => {
        if (promise.value === currentPromise) {
          error.value = err;
          result.value = null;
        }
        return err;
      })
      .finally(() => {
        if (promise.value === currentPromise) {
          loading.value = false;
        }
      });
  };

  if (immediate) setTimeout(execute, 0);

  return {
    execute,
    result,
    promise,
    loading,
    error,
  };
}
