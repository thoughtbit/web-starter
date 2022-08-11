import { dispatch, useStoreState } from "../store";

const increment = () => dispatch({ type: "increment" });
const decrement = () => dispatch({ type: "decrement" });

const Counter = () => {
  const value = useStoreState("count");
  return (
    <div>
      <h2>react-hooks-global-state</h2>
      <span>计数: {value}</span>
      <button className="btn" type="button" onClick={increment}>
        +
      </button>
      <button className="btn" type="button" onClick={decrement}>
        -
      </button>
    </div>
  );
};

export default Counter;
