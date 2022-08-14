import { createAction, createReducer } from "@reduxjs/toolkit";

export type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};

const increment = createAction<number>("counter/increment");
const decrement = createAction<number>("counter/decrement");

export default createReducer(initialState, (builder) =>
  builder
    .addCase(increment, (state, action) => {
      state.count += action.payload;
    })
    .addCase(decrement, (state, action) => {
      state.count -= action.payload;
    })
);
