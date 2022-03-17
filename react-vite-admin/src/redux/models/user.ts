import { createModel } from '@rematch/core';
import { RootModel } from '.';

export type UserState = {};

const initialState: UserState = {};

export const user: any = createModel<RootModel>()({
  state: initialState,
  reducers: {},
  effects: (dispatch) => ({}),
});
