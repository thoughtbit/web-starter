import { useRef, useEffect } from "react";

const isFunction = (value: unknown): value is Function => typeof value === "function";

const useLatest = (value: () => void) => {
  const ref = useRef(value);
  ref.current = value;

  return ref;
};

const useUnmount = (fn: () => void) => {
  if (process.env.NODE_ENV === "development") {
    if (!isFunction(fn)) {
      console.error(`useUnmount expected parameter is a function, got ${typeof fn}`);
    }
  }

  const fnRef = useLatest(fn);

  useEffect(
    () => () => {
      fnRef.current();
    },
    []
  );
};

export default useUnmount;
