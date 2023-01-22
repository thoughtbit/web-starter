import type { StateCreator } from 'zustand';
import type { StoreState, CounterStore, CounterState } from '../types';

const initialState: CounterStore = {
  count: 0,
};

export const createCounterSlice: StateCreator<
  StoreState,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  CounterState
> = (set) => ({
  ...initialState,

  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  resetCount: () => set({ ...initialState }),
});
