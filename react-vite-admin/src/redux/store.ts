import { init } from '@rematch/core';
import type {  RematchDispatch, RematchRootState } from '@rematch/core';
import loading, { ExtraModelsFromLoading } from '@rematch/loading';
import { models, RootModel } from './models'

type FullModel = ExtraModelsFromLoading<RootModel>;
const store = init<RootModel, FullModel>({
  models,
  redux: {
    devtoolOptions: {
      disabled: process.env.NODE_ENV == 'production',
    },
  },
  plugins: [
    loading(),
    // {
    //   middleware: () => next => async (action) => {
    //     // if (typeof window !== 'undefined') {
    //     //   const token = cookie.get('token');
    //     //   if (token) {
    //     //     await cookie.set('token', token, 1);
    //     //   }
    //     // }
    //     // do something here
    //     return next(action);
    //   },
    // },
  ],
});

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel, FullModel>

export default store;