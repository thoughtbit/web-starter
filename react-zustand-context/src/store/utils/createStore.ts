import type { StoreApi } from 'zustand';
import { createStore as create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import produce, { Draft } from 'immer';
import type { StateCreator } from './../types';

const immer =
  <TState extends AnyObject, TActions extends AnyObject>(
    config: StateCreator<TState, TActions, (fn: (draft: Draft<TState>) => void) => void>
  ): StateCreator<TState, TActions> =>
  (set, get, api) =>
    config((fn) => set(produce(fn) as any), get, api);

const combine =
  <TState extends AnyObject, TActions extends AnyObject>(
    initialState: TState,
    store: StateCreator<TState, TActions>
  ): StateCreator<TState & TActions> =>
  (set, get, api) => ({
    ...initialState,
    ...store(set as StoreApi<TState>['setState'], get, api),
  });

const combineAndImmer = <TState extends AnyObject, TActions extends AnyObject>(
  initialState: TState,
  config: StateCreator<TState, TActions, (fn: (draft: Draft<TState>) => void) => void>
) => combine(initialState, immer(config));

// **********************************************************************

const createStoreFull =
  (name: string) =>
  <TState extends AnyObject, TActions extends AnyObject>(
    initialState: TState,
    actions: StateCreator<TState, TActions, (fn: (draft: Draft<TState>) => void) => void>
  ) =>
    create(devtools(persist(combineAndImmer(initialState, actions), { name }), { name }));

const createStoreWithOutPersist =
  (name: string) =>
  <TState extends AnyObject, TActions extends AnyObject>(
    initialState: TState,
    actions: StateCreator<TState, TActions, (fn: (draft: Draft<TState>) => void) => void>
  ) =>
    create(devtools(combineAndImmer(initialState, actions), { name }));

const createStoreWithOutDevtools =
  (name: string) =>
  <TState extends AnyObject, TActions extends AnyObject>(
    initialState: TState,
    actions: StateCreator<TState, TActions, (fn: (draft: Draft<TState>) => void) => void>
  ) =>
    create(devtools(combineAndImmer(initialState, actions), { name }));

const createStorePure = <TState extends AnyObject, TActions extends AnyObject>(
  initialState: TState,
  actions: StateCreator<TState, TActions, (fn: (draft: Draft<TState>) => void) => void>
) => create(combineAndImmer(initialState, actions));

export type CreateStoreOptions =
  | { persist?: false; devtools?: false }
  | { persist: true; devtools?: false; name: string }
  | { persist?: false; devtools: true; name: string }
  | { persist: true; devtools: true; name: string };

export const createStore =
  (options: CreateStoreOptions = { devtools: false, persist: false }) =>
  <TState extends AnyObject, TActions extends AnyObject>(
    initialState: TState,
    actions: StateCreator<TState, TActions, (fn: (draft: Draft<TState>) => void) => void>
  ) => {
    if (options.devtools && options.persist) return createStoreFull(options.name)(initialState, actions);
    if (options.devtools) return createStoreWithOutPersist(options.name)(initialState, actions);
    if (options.persist) return createStoreWithOutDevtools(options.name)(initialState, actions);
    return createStorePure(initialState, actions);
  };
