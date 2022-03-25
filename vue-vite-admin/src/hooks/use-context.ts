import { InjectionKey, provide, inject, reactive, readonly as defineReadonly, UnwrapRef } from "vue";

export interface CreateContextOptions {
  readonly?: boolean;
  createProvider?: boolean;
  native?: boolean;
}

type ShallowUnwrap<T> = {
  [P in keyof T]: UnwrapRef<T[P]>;
};

export function createContext<T>(context: any, key: InjectionKey<T> = Symbol(), options: CreateContextOptions = {}) {
  const { readonly = true, createProvider = false, native = false } = options;

  const state = reactive(context);
  const provideData = readonly ? defineReadonly(state) : state;
  !createProvider && provide(key, native ? context : provideData);

  return {
    state,
  };
}

export function useContext<T>(key: InjectionKey<T>, native?: boolean): T;
export function useContext<T>(key: InjectionKey<T>, defaultValue?: any, native?: boolean): T;

export function useContext<T>(key: InjectionKey<T> = Symbol(), defaultValue?: any): ShallowUnwrap<T> {
  return inject(key, defaultValue || {});
}

// 使用
// import { InjectionKey, Ref } from 'vue';
// import { createContext, useContext } from '@/hooks';

// export interface AppProviderContextProps {
//   prefixCls: Ref<string>;
//   isMobile: Ref<boolean>;
// }

// const key: InjectionKey<AppProviderContextProps> = Symbol();

// export function createAppProviderContext(context: AppProviderContextProps) {
//   return createContext<AppProviderContextProps>(context, key);
// }

// export function useAppProviderContext() {
//   return useContext<AppProviderContextProps>(key);
// }
