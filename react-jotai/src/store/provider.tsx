import { useRef } from 'react';
import type { ReactNode } from 'react';
import { StoreApi } from 'zustand';
import { Provider } from './context';

export const ZustandProvider = ({
  createStore,
  children,
}: {
  createStore: () => StoreApi<any>;
  children: ReactNode;
}) => {
  const storeRef = useRef<StoreApi<any> | null>(null);

  if (!storeRef.current) {
    storeRef.current = createStore();
  }

  return <Provider value={storeRef.current}>{children}</Provider>;
};

ZustandProvider.displayName = 'ZustandProvider';

export default ZustandProvider;
