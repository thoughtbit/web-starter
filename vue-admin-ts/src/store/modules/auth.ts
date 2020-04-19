import { Commit, Dispatch } from "vuex";
import Storage from "@/utils/storage";
import * as types from "@/store/mutation-types";
import SERVICE from "@/core/lib/sevice";
import { IUserModel } from "@/types/user";

export interface State {
  errors: any;
  token: any;
  isLogin: boolean;
  currentUser: IUserModel;
}

const initState: State = {
  errors: null,
  token: "",
  isLogin: false,
  // @ts-ignore
  currentUser: null
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
  },
  [types.SET_AUTH](state: State, user: IUserModel): void {
    state.currentUser = user;
  }
};

// actions
const actions = {
  // async getUser(context: { state: State, commit: Commit }): Promise<void> {
  //
  // },

  async login(
    context: { commit: Commit, dispatch: Dispatch },
    params: { username: string; password: string }
  ): Promise<void> {
    // @ts-ignore
    await SERVICE["login"](params).then((res) => {
      Storage.setAccessToken(res.data.user);
      context.commit(types.SET_TOKEN, res.data.user);
    });
  },

  logout(context: { commit: Commit, dispatch: Dispatch }) {
    context.commit(types.SET_TOKEN, "");
  },

  async resetToken(context: { commit: Commit }): Promise<void> {
    context.commit(types.SET_TOKEN, "");
    await Storage.setAccessToken("");
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
