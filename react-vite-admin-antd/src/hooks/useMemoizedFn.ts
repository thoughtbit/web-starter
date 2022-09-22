import { useMemo, useRef } from "react";

type noop = (this: any, ...args: any[]) => any;

type PickFunction<T extends noop> = (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T>;

const isFunction = (value: unknown): value is Function => typeof value === "function";

function useMemoizedFn<T extends noop>(fn: T) {
  if (process.env.NODE_ENV === "development") {
    if (!isFunction(fn)) {
      console.error(`useMemoizedFn expected parameter is a function, got ${typeof fn}`);
    }
  }

  const fnRef = useRef<T>(fn);

  // why not write `fnRef.current = fn`?
  // https://github.com/alibaba/hooks/issues/728
  fnRef.current = useMemo(() => fn, [fn]);

  const memoizedFn = useRef<PickFunction<T>>();
  if (!memoizedFn.current) {
    memoizedFn.current = function (this, ...args) {
      return fnRef.current.apply(this, args);
    };
  }

  return memoizedFn.current as T;
}

export default useMemoizedFn;

/*
// 持久化 function 的 Hook，理论上，可以使用 useMemoizedFn 完全代替 useCallback。

  const [count, setCount] = useState(0);

  const callbackFn = useCallback(() => {
    message.info(`Current count is ${count}`);
  }, [count]);

  // 同上一样的效果, useMemoizedFn 函数地址不会变化，可以用于性能优化
  const memoizedFn = useMemoizedFn(() => {
    message.info(`Current count is ${count}`);
  });
*/