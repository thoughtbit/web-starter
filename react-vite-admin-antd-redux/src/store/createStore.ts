import { configureStore } from "@reduxjs/toolkit";
import type { Reducer, Middleware } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { DEBUG } from "~/constants";
import { api as ApiService } from "~/services";

export default (
  rootReducer: Reducer,
  middlewares?: Middleware[],
  listener?: Middleware,
  initialState?: Partial<unknown>
) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      const defaultMiddleware = getDefaultMiddleware({
        thunk: { extraArgument: ApiService },
        immutableCheck: false,
        // serializableCheck: false,
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      });

      middlewares && defaultMiddleware.concat(middlewares);
      listener && defaultMiddleware.prepend(listener);

      return defaultMiddleware;
    },
    preloadedState: {
      ...initialState,
    },
    devTools: DEBUG,
  });
