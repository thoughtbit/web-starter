import { type InjectionKey, inject, provide } from "vue";

/**
 * Create global state that can be injected into components.
 *
 * @see https://vueuse.org/createInjectionState
 *
 */
export function useInjectionState<Arguments extends Array<any>, Return>(
  composable: (...args: Arguments) => Return
): readonly [useProvidingState: (...args: Arguments) => void, useInjectedState: () => Return | undefined] {
  const key: string | InjectionKey<Return> = Symbol("InjectionState");
  const useProvidingState = (...args: Arguments) => {
    provide(key, composable(...args));
  };
  const useInjectedState = () => inject(key);

  return [useProvidingState, useInjectedState];
}
