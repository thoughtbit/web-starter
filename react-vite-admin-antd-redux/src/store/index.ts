import { addListener, createListenerMiddleware } from "@reduxjs/toolkit";
import type {
  Middleware,
  Action,
  AnyAction,
  ThunkAction,
  ListenerEffectAPI,
  PayloadAction,
  TypedAddListener,
  TypedStartListening,
  ThunkDispatch as GenericThunkDispatch,
} from "@reduxjs/toolkit";
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createLogger } from "redux-logger";
import { persistStore } from "redux-persist";
import errorMiddleware from "./middlewares/error";
import { DEBUG } from "@/constants";
import { api as ApiService } from "@/services";
import createStore from "./createStore";
import persistReducers from "./persistReducers";
import rootReducers from "./rootReducers";

const listenerMiddlewareInstance = createListenerMiddleware({
  onError: () => console.error,
});

const middlewares: Middleware[] = [errorMiddleware];
if (DEBUG) {
  const logger = createLogger({ collapsed: true });
  middlewares.push(logger);
}

export const store = createStore(persistReducers(rootReducers), middlewares, listenerMiddlewareInstance.middleware);
export const persistor = persistStore(store, {}, () => {
  // console.log('persistor:', store.getState());
});

export type RootState = ReturnType<typeof rootReducers>;
// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
export type ExtraArgumentType = typeof ApiService;
export type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra: ExtraArgumentType;
};

// Utility type to get strongly types thunks
export type ThunkResult<R> = ThunkAction<R, RootState, ExtraArgumentType, PayloadAction<any>>;
export type ThunkDispatch = GenericThunkDispatch<RootState, ExtraArgumentType, Action>;

export type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>;

// @see https://redux-toolkit.js.org/api/createListenerMiddleware#typescript-usage
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export type AppAddListener = TypedAddListener<RootState, AppDispatch>;

export const startAppListening = listenerMiddlewareInstance.startListening as AppStartListening;
export const addAppListener = addListener as AppAddListener;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useStore = () => store.getState();
export default store;
