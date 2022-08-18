import { useRef } from "react";
import { useEffect, useLayoutEffect } from "react";

type EffectHookType = typeof useEffect | typeof useLayoutEffect;

export const createUpdateEffect: (hook: EffectHookType) => EffectHookType = (hook) => (effect, deps) => {
  const isMounted = useRef(false);

  // for react-refresh
  hook(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  hook(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, deps);
};

const useUpdateEffect = createUpdateEffect(useEffect);

export default useUpdateEffect;

/*
// 使用上与 useEffect 完全相同，只是它忽略了首次执行，只在依赖项更新时执行。
useUpdateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
)

const Demo = () => {
  const [count, setCount] = useState(0);
  const [effectCount, setEffectCount] = useState(0);
  const [updateEffectCount, setUpdateEffectCount] = useState(0);

  useEffect(() => {
    setEffectCount((c) => c + 1);
  }, [count]);

  useUpdateEffect(() => {
    setUpdateEffectCount((c) => c + 1);
    return () => {
      // do something
    };
  }, [count]); // you can include deps array if necessary

  return (
    <div>
      <p>effectCount: {effectCount}</p>
      <p>updateEffectCount: {updateEffectCount}</p>
      <p>
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          reRender
        </button>
      </p>
    </div>
  );
};
*/
