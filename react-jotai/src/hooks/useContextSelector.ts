import {
  createElement,
  createContext as createContextOrig,
  useContext as useContextOrig,
  useLayoutEffect,
  useRef,
  useCallback,
  useSyncExternalStore,
} from 'react';
import type { ReactNode, Provider } from 'react';
import { shallowEqual } from '@/utils/shallowEqual';

const createProvider = (ProviderOrig: Provider<any>) => {
  const ContextProvider = ({ value, children } : { value: any; children: ReactNode}) => {
    const contextValue = useRef<any>();
    if (!contextValue.current) {
      const listeners = new Set();
      contextValue.current = {
        value,
        listeners,
      };
    }
    useLayoutEffect(() => {
      contextValue.current.value = value;
      contextValue.current.listeners.forEach((listener: any) => {
        // 这里不同了，不再需要给 listener 传入参数
        listener();
      });
    }, [value]);

    return createElement(ProviderOrig, { value: contextValue.current }, children);
  };

  return ContextProvider;
};

export function createContext(defaultValue: any) {
  const context = createContextOrig({
    value: defaultValue,
    listeners: new Set(),
  });
  (context as any).Provider = createProvider(context.Provider);
  delete (context as any).Consumer;
  return context;
}

// 基于 useSyncExternalStore 实现 useContextSelector
export function useContextSelector(context: any, selector: (value: any) => void, equalityFn = shallowEqual) {
  const contextValue: any = useContextOrig(context);
  const { value, listeners } = contextValue;

  const subscribe = useCallback(
    (callback: any) => {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    [listeners]
  );

  const lastSnapshot = useRef(selector(value));

  const getSnapshot = () => {
    const nextSnapshot = selector(contextValue.value);

    if (equalityFn(lastSnapshot.current, nextSnapshot)) {
      return lastSnapshot.current;
    }

    lastSnapshot.current = nextSnapshot;
    return nextSnapshot;
  };

  return useSyncExternalStore(subscribe, getSnapshot);
}

export default useContextSelector;

/*
const Context = createContext(null);
const Counter1 = () => {
 const { count1, setCount1 } = useContext(Context);
  return (
    <div>
      <span>count1: {count1}</span>
      <button onClick={() => setCount1((n) => n + 1)}>add count1</button>
    </div>
  );
};

const Counter1 = () => {
  const count1 = useContextSelector(Context, v => v.count1);
  const setCount1 = useContextSelector(Context, v => v.setCount1);
  return (
    <div>
      <span>count1: {count1}</span>
      <button onClick={() => setCount1((n) => n + 1)}>add count1</button>
    </div>
  );
};

const StateProvider = ({ children }) => (
  <Context.Provider value={useState({ count1: 0, count2: 0 })}>
    {children}
  </Context.Provider>
);

const App = () => (
  <StateProvider>
    <Counter1 />
    <Counter2 />
  </StateProvider>
);
*/