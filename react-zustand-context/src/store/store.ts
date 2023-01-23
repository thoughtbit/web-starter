import { createStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createGlobalsSlice } from './modules/global';
import { createAuthSlice } from './modules/auth';
import { createCounterSlice } from './modules/counter';
import { createTodosSlice } from './modules/todos';

import type { StoreState } from './types';

export const store = createStore<StoreState>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createCounterSlice(...a),
        ...createTodosSlice(...a),
        ...createAuthSlice(...a),
        ...createGlobalsSlice(...a),
      })),
      {
        name: 'zustand-storage',
      }
    )
  )
);

// selector
export const storeSelector = (state: StoreState) => {
  return {
    getCount: state.count,
    getTodoList: state.todos,
    isEmptyTodoList: state.todos.length === 0,

    displayListSelector: state.todos.filter((item) => item.completed),
    isAuthenticated: state.isAuthenticated,
    getToken: state.token,
  };
};
// storeSelector 使用方式,  shallow 浅比较
// const { getCount, getTodoList } = useStore(store, storeSelector, shallow);
