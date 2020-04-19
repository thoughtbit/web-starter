import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";

import app, { State as AppState } from "@/store/modules/app";
import logs, { State as LogsState } from "@/store/modules/logs";
import auth, { State as AuthState } from "@/store/modules/auth";

const debug = process.env.NODE_ENV !== "production";

Vue.use(Vuex);

export interface State {
  app: AppState;
  logs: LogsState;
  auth: AuthState;
}

export default new Vuex.Store<State>({
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  modules: {
    app,
    logs,
    auth
  }
});
