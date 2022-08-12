import { type AnyAction, configureStore, type ThunkAction } from "@reduxjs/toolkit";
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createLogger } from "redux-logger";
import errorMiddleware from "./middlewares/logger";
import { DEBUG } from "@/constants";
import { api as ApiService } from "@/services";
import rootReducer from "./reducer";

const middlewares: any[] = [errorMiddleware];
if (DEBUG) {
  const logger = createLogger({ collapsed: true });
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: ApiService },
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middlewares),
  devTools: DEBUG,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
export type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra: typeof ApiService;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
