import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";

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
    increment: (state: CounterState, action: PayloadAction<number>) => {
      // state.count++;
      state.count += action.payload;
    },

    decrement: (state: CounterState, action: PayloadAction<number>) => {
      // state.count--;
      state.count -= action.payload;
    },

    reset: (state: CounterState) => {
      state.count = 0;
    },
  },
  extraReducers: () => {},
});

export const selectCount = (state: RootState) => state.counter;

export const { increment, decrement, reset } = counterSlice.actions;

export default counterSlice.reducer;
