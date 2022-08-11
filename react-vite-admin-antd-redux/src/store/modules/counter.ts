import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";

const namespace = "counter";

export type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};

const counterSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    increment: (state: CounterState) => {
      state.count++;
    },

    decrement: (state: CounterState) => {
      state.count--;
    },

    reset: (state: CounterState) => {
      state.count = 0;
    },
  },
  extraReducers: () => {},
});

export const selectGlobal = (state: RootState) => state.global;

export const { increment, decrement, reset } = counterSlice.actions;

export default counterSlice.reducer;
