import type { StateCreator } from "zustand";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export type CounterSlice = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

const initialState = {
  count: 0,
};

export const createCounterSlice: StateCreator<
  CounterSlice,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  CounterSlice
> = (set) => ({
  ...initialState,

  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => {
    set({ ...initialState });
  },
});

const useCounterStore = create<CounterSlice>()(
  devtools(
    persist(createCounterSlice, {
      name: "counter-storage",
    })
  )
);

// selector 
export const getCount = () => useCounterStore.getState().count;

export default useCounterStore;
