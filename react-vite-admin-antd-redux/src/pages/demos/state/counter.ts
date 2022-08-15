import { createAction, createReducer } from "@reduxjs/toolkit";

export type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};

export const increment = createAction<number>("counter/increment");
export const decrement = createAction<number>("counter/decrement");
export const clear = createAction<void>("counter/clear");

export default createReducer(initialState, (builder) =>
  builder
    .addCase(increment, (state, action) => {
      state.count += action.payload;
    })
    .addCase(decrement, (state, action) => {
      state.count -= action.payload;
    })
    .addCase(clear, (state) => {
      state.count = 0;
    })
);
