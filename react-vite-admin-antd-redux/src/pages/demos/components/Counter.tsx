import { countDown, countUp, useGlobalState } from "../state";

const Counter = () => {
  const [value] = useGlobalState("count");
  return (
    <div>
      <h2>react-hooks-global-state</h2>
      <span>计数: {value}</span>
      <button className="btn" type="button" onClick={countUp}>
        +
      </button>
      <button className="btn" type="button" onClick={countDown}>
        -
      </button>
    </div>
  );
};

export default Counter;
