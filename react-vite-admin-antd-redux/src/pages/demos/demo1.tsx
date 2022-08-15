import { useAppDispatch, useAppSelector } from "@/store";
import { increment, decrement, clear } from "./state/counter";

const Counter = () => {
  const { count } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>redux state</h2>
      <span>计数: {count}</span>
      <button className="btn" type="button" onClick={() => dispatch(increment(10))}>
        +
      </button>
      <button className="btn" type="button" onClick={() => dispatch(decrement(10))}>
        -
      </button>

      <button className="btn" type="button" onClick={() => dispatch(clear())}>
        重置
      </button>
    </div>
  );
};

const Demo1 = () => {
  return (
    <div>
      <Counter />
    </div>
  );
};

export default Demo1;
