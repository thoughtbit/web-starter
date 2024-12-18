import { useContext, useMemo } from 'react';
import { useStore as useZustandStore } from 'zustand';
import type { StoreApi } from 'zustand';
import { StoreContext } from '../context';
import type { StoreState } from '../types';

type ExtractState = StoreApi<StoreState> extends { getState: () => infer T } ? T : never;
type WithoutCallSignature<T> = { [K in keyof T]: T[K] };

const errorMessage = 'Seems like you have not used zustand provider as an ancestor.';

export const useStore = <StateSlice = ExtractState>(
  selector: (state: ExtractState | any) => StateSlice,
  equalityFn?: (a: StateSlice, b: StateSlice) => boolean
) => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error('Seems like you have not used zustand provider as an ancestor.');
  }
  return useZustandStore(store, selector, equalityFn);
};

export const useStoreApi = () => {
  const store = useContext(StoreContext);

  if (store === null) {
    throw new Error(errorMessage);
  }

  return useMemo<WithoutCallSignature<StoreApi<StoreState>>>(() => ({ ...store }), [store]);
};
