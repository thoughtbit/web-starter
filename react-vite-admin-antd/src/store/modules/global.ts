import { type StateCreator } from "zustand";
import type { StoreState, GlobalsSlice } from "../types";

const initialState = {
  darkMode: true,
};

export const createGlobalsSlice: StateCreator<StoreState, [["zustand/devtools", never], ["zustand/persist", unknown]], [], GlobalsSlice> = (set) => ({
  ...initialState,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  reset: () => {
    set({ ...initialState });
  },
});
