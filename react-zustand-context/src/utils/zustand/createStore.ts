import type { StateCreator } from 'zustand';
import { createStore as create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type CreateStoreOptions =
  | { persist?: false; devtools?: false }
  | { persist: true; devtools?: false; name: string }
  | { persist?: false; devtools: true; name: string }
  | { persist: true; devtools: true; name: string };

const createStoreFull =
  (name: string) =>
  <TState>(
    initializer: StateCreator<
      TState,
      [['zustand/devtools', never], ['zustand/persist', unknown], ['zustand/immer', never]],
      []
    >
  ) =>
    create(
      devtools(
        persist(immer(initializer), {
          name,
        })
      )
    );

const createStoreWithPersist =
  (name: string) =>
  <TState>(
    initializer: StateCreator<
      TState,
      [['zustand/devtools', never], ['zustand/persist', unknown], ['zustand/immer', never]],
      []
    >
  ) =>
    create(
      persist(immer(initializer), {
        name,
      })
    );

const createStoreWithDevtools = <TState>(
  initializer: StateCreator<TState, [['zustand/devtools', never], ['zustand/immer', never]], []>
) => create(devtools(immer(initializer)));

const createStorePure = <TState>(initializer: StateCreator<TState, [['zustand/immer', never]], []>) =>
  create(immer(initializer));

export const createStore =
  <TState>(options?: CreateStoreOptions) =>
  (
    initializer: StateCreator<
      TState,
      [['zustand/devtools', never], ['zustand/persist', unknown], ['zustand/immer', never], [any, never | unknown]],
      []
    >
  ) => {
    if (options?.devtools && options?.persist) return createStoreFull(options?.name)(initializer);
    if (options?.persist) return createStoreWithPersist(options.name)(initializer);
    if (options?.devtools) return createStoreWithDevtools(initializer);
    return createStorePure(initializer);
  };
