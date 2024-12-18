import { useRef } from 'react';

export function useLatest<T>(value: T) {
  const ref = useRef<T>(value);
  ref.current = value;

  return ref;
}

export default useLatest;

/*
返回当前最新值的 Hook，可以避免闭包问题。
const [count, setCount] = useState(0);
const latestCountRef = useLatest(count);
*/