import { Commit, Dispatch } from "vuex";
import StorageManager from "@/utils/storage-manager";
import * as types from "@/store/mutation-types";
import SERVICE from "@/core/lib/sevice";
import { IUserModel } from "@/types/user";
import { Logger } from "@/utils/logger";

export interface State {
  errors: any;
  token: string;
  isLogin: boolean;
  userInfo: IUserModel;
}

const initState: State = {
  errors: null,
  token: "",
  isLogin: false,
  // @ts-ignore
  userInfo: null
};

// getters
const getters = {};

// mutations
const mutations = {
  [types.SET_ERROR](state: State, error: any): void {
    state.errors = error;
  },
  [types.SET_TOKEN](state: State, token: string): void {
    state.token = token;
    state.isLogin = true;
  },
  [types.SET_USER](state: State, user: IUserModel): void {
    state.userInfo = user;
  },
  [types.SET_LOGIN_STATUS](state: State, loginStatus: boolean): void {
    state.isLogin = loginStatus;
  },
  [types.CLEAR_TOKEN](state: State): void {
    state.token = ""
    state.isLogin = false;
  }
};

// actions
const actions = {
  async getUser(context: { state: State, commit: Commit }): Promise<void> {
    // @ts-ignore
    await SERVICE["getUser"]().then((res) => {
      // Logger.info("用户基础信息", "AuthStore", res)();
      context.commit(types.SET_USER, res.data);
    });
  },

  async login(
    context: { commit: Commit, dispatch: Dispatch },
    params: { username: string; password: string }
  ): Promise<void> {
    // @ts-ignore
    await SERVICE["login"](params).then((res) => {
      // Logger.info("用户登录", "AuthStore", res)();

      StorageManager.setAccessToken(res.data.access_token);
      StorageManager.setRefreshToken(res.data.refresh_token);

      context.commit(types.SET_TOKEN, res.data.access_token);
      context.commit(types.SET_LOGIN_STATUS, true);
    });
  },

  logout(context: { commit: Commit, dispatch: Dispatch }) {
    context.commit(types.SET_TOKEN, "");
  },

  async resetToken(context: { commit: Commit }): Promise<void> {
    context.commit(types.SET_TOKEN, "");
    await StorageManager.setAccessToken("");
  },
  refreshToken(context: { commit: Commit, state: State }) {
    context.commit(types.SET_TOKEN, context.state.token);
  },
  resetPassword() {}
};

export default {
  namespaced: true,
  state: initState,
  getters,
  mutations,
  actions
};
