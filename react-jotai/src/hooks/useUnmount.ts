import { useEffect } from 'react';
import useLatest from './useLatest';

const useUnmount = (fn: () => any): void => {
  const fnRef = useLatest(fn);
  
  useEffect(
    () => () => {
      fnRef.current();
    },
    []
  );
};

export default useUnmount;
