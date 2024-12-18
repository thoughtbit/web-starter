import { useCallback, useState } from 'react';
import { isFunction, isPromise, isUndefined } from '@/utils';
import useLatest from './useLatest';

export const useAsyncData = <T = Record<string, any>[]>({ loadData, validate }: UseAsyncDataProps<T>) => {
  const [status, setStatus] = useState('pending');

  const loadDataLatestRef = useLatest(loadData);
  const validateLatestRef = useLatest(validate);

  const onLoadData = useCallback(
    (...args: any[]) => {
      setStatus('pending');

      return new Promise<T>((resolve, reject) => {
        const loadDataLatest = loadDataLatestRef.current;
        const validateLatest = validateLatestRef.current;

        const resultMayBePromise: any = isFunction(loadDataLatest) ? loadDataLatest(...args) : loadDataLatest;

        if (isUndefined(resultMayBePromise)) {
          setStatus('rejected');
          reject(resultMayBePromise);
          return;
        }

        if (validateLatest(resultMayBePromise)) {
          setStatus('fulfilled');
          resolve(resultMayBePromise);
          return;
        }

        if (isPromise(resultMayBePromise)) {
          setStatus('loading');

          resultMayBePromise
            .then((res) => {
              if (isUndefined(res)) {
                setStatus('rejected');
                reject(res);
                return;
              }

              if (validateLatest(res)) {
                setStatus('fulfilled');
                resolve(res);
                return;
              }

              setStatus('rejected');
              reject(res);
            })
            .catch((err) => {
              setStatus('rejected');
              reject(err);
            });
          return;
        }

        setStatus('rejected');
        reject(new Error('Invalid Return'));
      });
    },
    [loadDataLatestRef, validateLatestRef]
  );

  return {
    loading: status === 'loading',
    hasError: status === 'rejected',
    onLoadData,
  };
};

export type UseAsyncLoadData<T> =
  | T
  | ((...args: any[]) => T | void | undefined)
  | ((...args: any[]) => Promise<T | void | undefined>);

export interface UseAsyncDataProps<T = any> {
  loadData?: UseAsyncLoadData<T>;
  validate: (arg: unknown) => arg is T;
}

export type UseAsyncDataReturn = ReturnType<typeof useAsyncData>;
