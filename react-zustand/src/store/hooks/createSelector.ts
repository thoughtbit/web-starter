import { StoreApi, UseBoundStore } from 'zustand';

export type ZustandHookSelectors<StateType> = {
  [Key in keyof StateType as `use${Capitalize<
    string & Key
  >}`]: () => StateType[Key];
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function createSelectorHooks<StateType extends object>(
  store: UseBoundStore<StoreApi<StateType>>,
) {
  const storeIn = store as any;

  Object.keys(storeIn.getState()).forEach((key) => {
    const selector = (state: StateType) => state[key as keyof StateType];
    storeIn[`use${capitalize(key)}`] = () => storeIn(selector);
  });

  return storeIn as UseBoundStore<StoreApi<StateType>> &
    ZustandHookSelectors<StateType>;
}

/*
import { create } from 'zustand';

// 包装 store
const useStore = createSelector(useStoreBase);

// use it like this!
// useStore.useBlah is a pre-generated selector, yeah!
const TestComponent = () => {
  const bears = useStore.useBears();
  const increase = useStore.useIncrease();

  return (
    <>
      <span>{bears}</span>

      <button
        onClick={() => {
          increase(1);
        }}
      >
        +
      </button>
    </>
  );
};
*/