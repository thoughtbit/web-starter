import { useEffect, useRef } from 'react';
import useLatestFn from './useLatestFn';

/**
 * A hook for running when component unmount, will return unmountRef sign
 */
export const useUnmountEffect = (cleanup?: () => void) => {
  const cleanupLatest = useLatestFn(cleanup);
  const unmountRef = useRef(false);

  useEffect(() => {
    return () => {
      unmountRef.current = true;
      cleanupLatest();
    };
  }, []);

  return unmountRef;
};

export default useUnmountEffect;

/*
获取当前组件是否已经卸载的 Hook。
const MyComponent = () => {
  const unmountedRef = useUnmountEffect();
  useEffect(() => {
    setTimeout(() => {
      if (!unmountedRef.current) {
        message.info('component is alive');
      }
    }, 3000);
  }, []);

  return <p>Hello World!</p>;
};
*/
