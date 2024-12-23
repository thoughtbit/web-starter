import type { ReactNode } from 'react';
import { createElement, createContext as createReactContext, useMemo, useContext as useReactContext } from 'react';

export interface CreateContextOptions<T> {
  strict?: boolean;
  hookName?: string;
  providerName?: string;
  errorMessage?: string;
  name?: string;
  defaultValue?: T;
}

export type CreateContextReturn<T> = [React.Provider<T>, () => T, React.Context<T>];

function getErrorMessage(hook: string, provider: string) {
  return `${hook} returned \`undefined\`. Seems you forgot to wrap component within ${provider}`;
}

export function createContext<T>(options: CreateContextOptions<T> = {}) {
  const {
    name,
    strict = true,
    hookName = 'useContext',
    providerName = 'Provider',
    errorMessage,
    defaultValue = undefined,
  } = options;

  const Context = createReactContext<T | undefined>(defaultValue);

  function Provider(props: any & { children: ReactNode }) {
    const { children, ...context } = props;
    const value = useMemo(() => context, Object.values(context));
    return createElement(Context.Provider, { value: value }, children);
  }

  function useContext() {
    const context = useReactContext(Context);

    if (!context && strict) {
      const error = new Error(errorMessage ?? getErrorMessage(hookName, providerName));
      error.name = 'ContextError';
      Error.captureStackTrace?.(error, useContext);
      throw error;
    }

    return context;
  }
  
  Context.displayName = name;

  return [Provider, useContext, Context] as CreateContextReturn<T>;
}

export default createContext;
