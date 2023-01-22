import { useStore } from '@/store';

const Counter = () => {
  const [count, decrement, increment, resetCount] = useStore((state) => [
    state.count,
    state.decrement,
    state.increment,
    state.resetCount,
  ]);

  const { getState, setState, subscribe, destroy } = useStore;
  
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
    </div>
  );
};

export default Counter;
