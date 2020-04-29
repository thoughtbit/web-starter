import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";

import app, { State as AppState } from "@/store/modules/app";
import permission, { State as PermissionState } from "@/store/modules/permission";
import logs, { State as LogsState } from "@/store/modules/logs";
import auth, { State as AuthState } from "@/store/modules/auth";
import getters from "@/store/getters";

const debug = process.env.NODE_ENV !== "production";

Vue.use(Vuex);

export interface State {
  app: AppState;
  permission: PermissionState;
  logs: LogsState;
  auth: AuthState;
}

export default new Vuex.Store<State>({
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  getters,
  modules: {
    app,
    permission,
    logs,
    auth
  }
});
