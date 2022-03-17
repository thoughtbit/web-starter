import { createModel } from '@rematch/core';
import type { RootModel } from '.';

export interface AppState {
  locale: string;
  isLogin: boolean;
  token: string;
  preferredAppearance: string;
}

const initialState: AppState = {
  locale: 'zh',
  isLogin: false,
  token: '',
  preferredAppearance: 'no-preference',
};

export const app = createModel<RootModel>()({
  state: initialState,
  reducers: {
    reset: () => initialState,

    setAppState: (
      state: AppState,
      payload: Record<string, unknown>,
    ): AppState => ({
      ...state,
      ...payload,
    }),

    update: (state: AppState, payload: Record<string, unknown>): AppState => ({
      ...state,
      ...payload,
    }),
  },
});
