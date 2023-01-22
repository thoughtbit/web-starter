import { useState } from "react";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import request, { cancelTokenSource } from "@/utils/request";
import { isString } from "@/utils/util";
import useAsyncFn from "./useAsyncFn";

export interface UseAxiosReturn<T, D = any> {
  result: any;
  canceled: boolean;
  error: AxiosError<T, D> | Error | undefined;
  loading: boolean;
  cancel: (message?: string | undefined) => void;
}

export interface UseAxiosOptions {
  // 是否立即执行
  immediate?: boolean;
}

export interface StrictUseAxiosReturn<T, D> extends UseAxiosReturn<T, D> {
  execute: (url?: string | AxiosRequestConfig<D>, config?: AxiosRequestConfig<D>) => Promise<AxiosResponse<T, D>>;
}

export function useRequest<T = any, D = any>(...args: any[]): StrictUseAxiosReturn<T, D> {
  const url: string | undefined = typeof args[0] === "string" ? args[0] : undefined;
  const argsPlaceholder = isString(url) ? 1 : 0;
  let options = { immediate: !!argsPlaceholder };
  let defaultConfig: AxiosRequestConfig<T> = {};
  if (args.length > 0 + argsPlaceholder) {
    defaultConfig = args[0 + argsPlaceholder];
  }

  options = args[args.length - 1];

  const [isAborted, setIsAborted] = useState(false);

  const [state, execute] = useAsyncFn(
    async (executeUrl: string | AxiosRequestConfig<D> | undefined = url, config: AxiosRequestConfig<D> = {}) => {
      const _url = typeof executeUrl === "string" ? executeUrl : url ?? "";
      return await request(_url, { cancelToken: cancelTokenSource.token, ...config });
    },
    [url]
  );

  const abort = (message?: string) => {
    if (!state?.loading) {
      return;
    }
    cancelTokenSource.cancel(message);
    setIsAborted(true);
  };

  if (options.immediate && url) setTimeout(execute, 0);

  return {
    cancel: abort,
    canceled: isAborted,

    result: state?.value,
    error: state?.error,
    loading: state?.loading,
    execute,
  };
}
