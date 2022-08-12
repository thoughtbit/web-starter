import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "../store";

const namespace = "counter";

export type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};
 
export const inc = (dispatch: AppDispatch) => {
  dispatch(counterSlice.actions.increment);
};

export const dec = (dispatch: AppDispatch) => {
  dispatch(counterSlice.actions.decrement);
};

export const clear = (dispatch: AppDispatch) => {
  dispatch(counterSlice.actions.reset);
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
