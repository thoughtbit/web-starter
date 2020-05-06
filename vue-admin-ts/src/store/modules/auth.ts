import { Commit, Dispatch } from "vuex";
import StorageManager from "@/utils/storage-manager";
import * as types from "@/store/mutation-types";
import SERVICE from "@/core/lib/sevice";
import { IUserModel, ITokenModel } from "@/types/user";
import { Logger } from "@/utils/logger";

export interface State {
  errors: any;
  token: ITokenModel;
  isLogin: boolean;
  userInfo: IUserModel;
}

const initState: State = {
  errors: null,
  token: {
    access_token: "",
    refresh_token: "",
    expires_in: 0
  },
  isLogin: false,
  userInfo: {
    id: "",
    username: "",
    nickname: "",
    rolename: "",
    avatar_url: "",
  },
};

// getters
const getters = {};

// mutations
const mutations = {
  [types.SET_ERROR](state: State, error: any): void {
    state.errors = error;
  },
  [types.SET_TOKEN](state: State, token: ITokenModel): void {
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
    state.token = {
      access_token: "",
      refresh_token: "",
      expires_in: 0
    }
    state.isLogin = false;
  }
};

// actions
const actions = {
  async getUser(context: { state: State, commit: Commit }): Promise<boolean> {
    // @ts-ignore
    return await SERVICE["getUser"]().then((res) => {
      Logger.info("用户基础信息", "AuthStore", res)();
      context.commit(types.SET_USER, res.data);
      return true;
    });
  },

  async login(
    context: { commit: Commit },
    params: { username: string; password: string }
  ): Promise<void> {
    // @ts-ignore
    await SERVICE["login"](params).then((res) => {
      Logger.info("用户登录", "AuthStore", res)();

      StorageManager.setToken(res.data);

      context.commit(types.SET_TOKEN, res.data);
      context.commit(types.SET_LOGIN_STATUS, true);
    });
  },

  async logout(context: { commit: Commit, dispatch: Dispatch }) {
    // @ts-ignore
    await SERVICE["logout"]().then(() => {
      context.commit(types.SET_TOKEN, {
        access_token: "",
        refresh_token: "",
        expires_in: 0
      });
      context.commit(types.SET_LOGIN_STATUS, false);
      StorageManager.removeToken();
      context.dispatch("permission/clear", true, { root: true })
    });
  },

  async resetToken(context: { commit: Commit }): Promise<void> {
    context.commit(types.SET_TOKEN, {
      access_token: "",
      refresh_token: "",
      expires_in: 0
    });
    StorageManager.removeToken();
  },
  refreshToken(context: { commit: Commit, state: State }) {
    context.commit(types.SET_TOKEN, context.state.token.refresh_token);
  },
  resetPassword() {

  },

};

export default {
  namespaced: true,
  state: initState,
  getters,
  mutations,
  actions
};
