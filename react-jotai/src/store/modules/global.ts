import { type StateCreator } from 'zustand';
import type { StoreState, GlobalsState, GlobalsStore } from '../types';

const initialState: GlobalsStore = {
  darkMode: true,
};

export const createGlobalsSlice: StateCreator<
  StoreState,
  [['zustand/devtools', never], ['zustand/persist', unknown], ["zustand/immer", never]],
  [],
  GlobalsState
> = (set) => ({
  ...initialState,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  reset: () => {
    set({ ...initialState });
  },
});
