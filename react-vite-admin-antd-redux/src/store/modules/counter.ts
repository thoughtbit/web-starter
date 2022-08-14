import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, RootState, AppThunk } from "../";

const namespace = "counter";

export type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};

export const inc2: (step: number) => AppThunk = (step) => (dispatch) => {
  dispatch(counterSlice.actions.increment(step));
};

export const inc = (step: number) => (dispatch: AppDispatch) => {
  dispatch(counterSlice.actions.increment(step));
};

export const dec = (step: number) => (dispatch: AppDispatch) => {
  dispatch(counterSlice.actions.decrement(step));
};

export const clear = () => (dispatch: AppDispatch) => {
  dispatch(counterSlice.actions.reset());
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

export const selectGlobal = (state: RootState) => state.global;

export const { increment, decrement, reset } = counterSlice.actions;

export default counterSlice.reducer;
