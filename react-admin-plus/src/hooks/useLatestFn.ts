import { useCallback } from 'react';
import useLatest from './useLatest';

/**
 * Keep callback function up-to-date if it changes.
 *
 * @param callback
 * @returns
 */
export function useLatestFn<T extends (...args: any[]) => any>(callback: T | undefined) {
  const ref = useLatest(callback);
  return useCallback((...args: any[]) => ref.current?.(...args), []) as T;
}

export default useLatestFn

/*
  const handleClose = useLatestFn(() => {
    onClose?.()
  })
*/