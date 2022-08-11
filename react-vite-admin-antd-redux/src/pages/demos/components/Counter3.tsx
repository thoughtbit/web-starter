import { useCounterStore } from "@/store";

const Counter = () => {
  const [count, decrement, increment, reset] = useCounterStore((state) => [
    state.count,
    state.decrement,
    state.increment,
    state.reset,
  ]);
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

      <button className="btn" type="button" onClick={reset}>
        重置
      </button>
    </div>
  );
};

export default Counter;
