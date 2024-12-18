import { type DependencyList, useRef, useMemo } from "react";
import { useSafeLayoutEffect } from './useSafeLayoutEffect';

/**
 * React hook to persist any value between renders,
 * but keeps it up-to-date if it changes.
 *
 * @param fn the function to persist
 * @param deps the function dependency list
 */
export function useCallbackRef<T extends (...args: any[]) => any>(
  fn: T | undefined,
  deps: DependencyList = []
): T {
  const callbackRef = useRef(fn);

  useSafeLayoutEffect(() => {
    callbackRef.current = fn;
  });

  // https://github.com/facebook/react/issues/19240
  return useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, []);
}

export default useCallbackRef;

/*
// 使用]
const handleChange = useCallbackRef(onChange);
const handleChange = useCallbackRef(onChange, [def]);
*/
