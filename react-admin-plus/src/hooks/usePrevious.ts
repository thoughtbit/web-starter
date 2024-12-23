import { useRef } from 'react';

/**
 * 获取 hooks 上一个状态
 *
 * 使用可参考: https://ahooks.js.org/zh-CN/hooks/state/use-previous
 */

export type compareFunction<T> = (prev: T | undefined, next: T) => boolean;

function usePrevious<T>(state: T, compare?: compareFunction<T>): T | undefined {
  const prevRef = useRef<T>();
  const curRef = useRef<T>();

  const needUpdate = typeof compare === 'function' ? compare(curRef.current, state) : true;
  if (needUpdate) {
    prevRef.current = curRef.current;
    curRef.current = state;
  }

  return prevRef.current;
}

export default usePrevious;

/*
// 保存上一次状态的 Hook。
 const [count, setCount] = useState(0);
  const previous = usePrevious(count);
  return (
    <>
      <div>counter current value: {count}</div>
      <div style={{ marginBottom: 8 }}>counter previous value: {previous}</div>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        increase
      </button>
      <button type="button" style={{ marginLeft: 8 }} onClick={() => setCount((c) => c - 1)}>
        decrease
      </button>
    </>
  );


  const nameCompareFunction = (prev: Person | undefined, next: Person) => {
  if (!prev) {
    return true;
  }
  if (prev.name !== next.name) {
    return true;
  }
  return false;
};

const previousName = usePrevious(state, nameCompareFunction);
 <div>previous name: {(previousName || {}).name}</div>
*/