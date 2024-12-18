import { useState, useCallback } from 'react';

export type UseCheckStateReturn = ReturnType<typeof useCheckState>;

/**
 * A hook to check unique ids
 */
export const useCheckState = <T>(initialValue: T[] = []) => {
  const [keyList, setKeyList] = useState<T[]>(initialValue);

  const remove = useCallback((targetKey: T) => {
    setKeyList((prev) => prev.filter((key) => key !== targetKey));
  }, []);

  const add = useCallback((targetKey: T) => {
    setKeyList((prev) => (prev.indexOf(targetKey) === -1 ? prev.concat(targetKey) : prev));
  }, []);

  const has = useCallback(
    (targetKey: T) => {
      return keyList.indexOf(targetKey) !== -1;
    },
    [keyList]
  );

  return {
    state: keyList,
    has,
    add,
    remove,
  };
};

/*
  const { state: ids, add: addIds, remove: removeIds } = useCheckState<
    React.ReactText
  >()
 */
