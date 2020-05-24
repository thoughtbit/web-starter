import { createStore } from "redux";
import {
  initGlobalState,
  MicroAppStateActions
} from "qiankun";

export type State = {
  token?: string;
};

type Action = {
  type: string;
  payload: any;
};

const initialState = {};

const reducer = (state: State = {}, action: Action): State => {
  switch (action.type) {
    default:
      return state;
    // 设置 Token
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
  }
};

export const actions: MicroAppStateActions = initGlobalState(initialState);

export default function configureStore(initialState = {}) {
  const store = createStore<State, Action, unknown, unknown>(reducer);
  return store;
}
