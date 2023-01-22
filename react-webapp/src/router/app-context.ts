import React from "react";
import type { IClientRoute, IRouteComponents, IRoutesById } from "./types";

interface IAppContextType {
  routes: IRoutesById;
  routeComponents: IRouteComponents;
  clientRoutes: IClientRoute[];
  preloadRoute?: (to: string) => void;
  history?: any;
}
export const AppContext = React.createContext<IAppContextType>({} as IAppContextType);

export function useAppData() {
  return React.useContext(AppContext);
}
