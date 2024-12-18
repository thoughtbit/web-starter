import { useStore } from 'zustand';
import { store } from '@/store';
import { useEffect, useRef } from 'react';

const Counter = () => {
  const scratchRef = useRef<number>();
  const [count, decrement, increment, resetCount] = useStore(store, (s) => [
    s.count,
    s.decrement,
    s.increment,
    s.resetCount,
  ]);

  const { getState, setState, subscribe, destroy } = store;

  useEffect(() => {
    subscribe((state) => (scratchRef.current = state.count));
  }, []);

  return (
    <div>
      <h2>zustand state</h2>
      <span>计数: {count}</span>
      <button className="btn" type="button" onClick={increment}>
        +
      </button>
      <button className="btn" type="button" onClick={decrement}>
        -
      </button>

      <button className="btn" type="button" onClick={resetCount}>
        重置
      </button>
      <button
        onClick={() => {
          setState({ count: 10 });
        }}
      >
        setState()
      </button>
      <button
        onClick={() => {
          console.log(getState());
        }}
      >
        getState()
      </button>
      <p>subscribe监听: {scratchRef.current}</p>
    </div>
  );
};

export default Counter;
