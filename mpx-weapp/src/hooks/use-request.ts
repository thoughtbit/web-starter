import type { fetchOption } from '@mpxjs/fetch';
import { PromiseOptions, usePromise } from './use-promise';
import { cancelToken, request } from '@/utils/request';
import type { HttpMethod, AnyObj } from '@/utils/request';
import { ref, type Ref } from '@mpxjs/core';

type PromiseType<T extends Promise<any>> = T extends Promise<infer R> ? R : never;

export interface PromiseResult<T extends Promise<any>, TR = PromiseType<T>, TError = any> {
  execute: (url: string, method: HttpMethod, data: AnyObj, options: fetchOption | any) => Promise<any>;
  promise: Ref<T | any>;
  result: Ref<TR | any>;
  loading: Ref<boolean>;
  error: Ref<TError>;
  cancel: Function;
  canceled: Ref<boolean>;
}
export const abortController = cancelToken;
export function useRequest<T extends Promise<any>>(config: PromiseOptions): PromiseResult<T> {
  const isAborted = ref(false);

  const use = usePromise(async (url: string, method: HttpMethod, data: AnyObj, options: fetchOption | any) => {
    return await request(url, method, data, {
      cancelToken: abortController.token,
      ...options,
    });
  }, config);

  const abort = (message?: string) => {
    if (!use.loading.value) {
      return;
    }
    abortController.exec(message);
    isAborted.value = true;
  };

  return {
    ...use,
    cancel: abort,
    canceled: isAborted,
  };
}
