import { dispatch, useStoreState } from "../store";

const increment = () => dispatch({ type: "increment" });
const decrement = () => dispatch({ type: "decrement" });

const Counter = () => {
  const value = useStoreState("count");
  return (
    <div>
      <span>计数: {value}</span>
      <button type="button" onClick={increment}>
        +
      </button>
      <button type="button" onClick={decrement}>
        -
      </button>
    </div>
  );
};

export default Counter;
