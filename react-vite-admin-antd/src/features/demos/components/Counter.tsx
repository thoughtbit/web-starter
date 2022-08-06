import { countDown, countUp, useGlobalState } from "../state";

const Counter = () => {
  const [value] = useGlobalState("count");
  return (
    <div>
      <span>Count: {value}</span>
      <button type="button" onClick={countUp}>
        +
      </button>
      <button type="button" onClick={countDown}>
        -
      </button>
    </div>
  );
};

export default Counter;
