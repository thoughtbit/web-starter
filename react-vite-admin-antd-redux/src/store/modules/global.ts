import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../";

const namespace = "global";

export type GlobalsState = {
  loading: boolean;
  collapsed: boolean;
};

const initialState: GlobalsState = {
  loading: false,
  collapsed: false,
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
  },
  extraReducers: () => {},
});

export const selectGlobal = (state: RootState) => state.global;

export const { toggleMenu } = globalSlice.actions;

export default globalSlice.reducer;
