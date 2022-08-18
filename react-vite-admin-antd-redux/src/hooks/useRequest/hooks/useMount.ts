import { useEffect } from "react";

const isFunction = (value: unknown): value is Function => typeof value === "function";

const useMount = (fn: () => void) => {
  if (process.env.NODE_ENV === "development") {
    if (!isFunction(fn)) {
      console.error(`useMount: parameter \`fn\` expected to be a function, but got "${typeof fn}".`);
    }
  }

  useEffect(() => {
    fn?.();
  }, []);
};

export default useMount;
