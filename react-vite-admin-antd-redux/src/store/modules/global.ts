import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const namespace = "global";

export type GlobalsState = {
  loading: boolean;
  collapsed: boolean;
  darkMode: boolean;
};

const initialState: GlobalsState = {
  loading: false,
  collapsed: false,
  darkMode: true,
};

const globalSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    toggleMenu: (state: GlobalsState, action: PayloadAction<GlobalsState>) => {
      if (action.payload === null) {
        state.collapsed = !state.collapsed;
      } else {
        state.collapsed = !!action.payload;
      }
    },

    toggleDarkMode: (state: GlobalsState, action: PayloadAction<GlobalsState>) => {
      if (action.payload === null) {
        state.darkMode = !state.darkMode;
      } else {
        state.darkMode = !!action.payload;
      }
    },
  },
  extraReducers: () => {},
});

export const selectGlobal = (state: RootState) => state.global;

export const { toggleMenu, toggleDarkMode } = globalSlice.actions;

export default globalSlice.reducer;
