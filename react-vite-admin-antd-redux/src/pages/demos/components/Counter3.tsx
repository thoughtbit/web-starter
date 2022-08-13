import { useAppDispatch, useAppSelector } from "@/store";
import { inc, dec, clear } from "@/store/modules/counter";

const Counter = () => {
  const { count } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>redux state</h2>
      <span>计数: {count}</span>
      <button className="btn" type="button" onClick={() => dispatch(inc(10))}>
        +
      </button>
      <button className="btn" type="button" onClick={() => dispatch(dec(10))}>
        -
      </button>

      <button className="btn" type="button" onClick={() => dispatch(clear())}>
        重置
      </button>
    </div>
  );
};

export default Counter;
