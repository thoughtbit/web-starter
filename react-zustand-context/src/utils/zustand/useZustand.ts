/*
Zustand has useStore hook that can be used with vanilla store, which is identical to useZustand in terms of the usage.

import { createStore, useStore } from 'zustand';

// `createStore` is the same with:
import { createStore } from 'zustand/vanilla';
useStore is implemented with useSyncExternalStore which is a recommended way to use "external stores". It solves tearing issues.

However, the "Sync" behavior doesn't work nicely with concurrent rendering. We can't use startTransition as expected.

useZustand doesn't use useSyncExternalStore, but only useReducer and useEffect. It suffers from tearing, but works better with concurrent rendering.

After all, it's a trade-off.
*/

import { useEffect, useMemo, useReducer } from 'react';
import type { DispatchWithoutAction, Reducer } from 'react';
import type { StoreApi } from 'zustand';

export function useZustand<State, Slice>(
  store: StoreApi<State>,
  selector: (state: State) => Slice,
  areEqual: (a: Slice, b: Slice) => boolean = Object.is,
) {
  const state = store.getState();
  const slice = useMemo(() => selector(state), [state, selector]);
  const [[sliceFromReducer, storeFromReducer], rerender] = useReducer<
    Reducer<readonly [Slice, StoreApi<State>], boolean | undefined>,
    undefined
  >(
    (prev, fromSelf?: boolean) => {
      if (fromSelf) {
        return [slice, store];
      }
      const nextState = store.getState();
      if (Object.is(state, nextState) && prev[1] === store) {
        return prev;
      }
      const nextSlice = selector(nextState);
      if (areEqual(prev[0], nextSlice) && prev[1] === store) {
        return prev;
      }
      return [nextSlice, store];
    },
    undefined,
    () => [slice, store],
  );
  useEffect(() => {
    const unsubscribe = store.subscribe(rerender as DispatchWithoutAction);
    (rerender as DispatchWithoutAction)();
    return unsubscribe;
  }, [store]);
  if (storeFromReducer !== store) {
    rerender(true);
    return slice;
  }
  if (!areEqual(sliceFromReducer, slice)) {
    rerender(true);
  }
  return sliceFromReducer;
}

/*
import { createStore } from 'zustand';
import { useZustand } from '@/utils/zustand';

const countStore = createStore<{
  count: number;
  inc: () => void;
}>((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));

const Counter = () => {
  const count = useZustand(countStore, (state) => state.count);
  const inc = useZustand(countStore, (state) => state.inc);
  return (
    <div>
      {count}
      <button type="button" onClick={inc}>
        +1
      </button>
    </div>
  );
};
const App = () => (
  <div>
    <Counter />
  </div>
);
*/