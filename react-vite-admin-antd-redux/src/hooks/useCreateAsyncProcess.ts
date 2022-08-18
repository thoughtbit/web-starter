import { useRef } from "react";

interface CreateAsyncProcessReturn<T extends (...args: any[]) => any> {
  active: any;
  run: (...args: Parameters<T>) => Promise<ReturnType<T>>;
}

export function createAsyncProcess<T extends (...args: any[]) => any>(
  fn: T
): CreateAsyncProcessReturn<T> {
  const active: CreateAsyncProcessReturn<T>["active"] = useRef(false);

  const run: CreateAsyncProcessReturn<T>["run"] = async (...args) => {
    active.current = true;
    const result = await fn(...args);
    active.current = false;
    return result;
  };

  return { active, run };
}

/*
const { active: loading, run: runWrappedFetchList } = createAsyncProcess(fetchList);
*/