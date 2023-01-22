import { useCallback, useEffect, useRef, useState } from "react";

export function useSafeSetState<T>(
  initialState?: T | (() => T)
): [T | undefined, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState(initialState);

  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  const safeSetState = useCallback(
    (args: any) => {
      if (mountedRef.current) {
        return setState(args);
      }
    },
    [mountedRef, setState]
  );

  return [state, safeSetState];
}

export default useSafeSetState;
