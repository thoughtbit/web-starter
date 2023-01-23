import { createContext } from 'react';

export const StoreContext = createContext<any>(null);
export const Provider = StoreContext.Provider;
