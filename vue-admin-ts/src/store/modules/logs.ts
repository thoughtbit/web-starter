import { Commit } from "vuex";
import * as types from '@/store/mutation-types';
import { dateFormat } from "@/utils/common";
import SERVICE from "@/core/lib/sevice";

export interface State {
  logsList: any;
}

const initState: State = {
  logsList: []
};

// getters
const getters = {};

// mutations
const mutations = {
  [types.ADD_LOGS](state: State, { type, message, stack, info } : any):void {
    state.logsList.push(Object.assign({
      url: window.location.href,
      time: dateFormat(new Date())
    }, {
      type,
      message,
      stack,
      info: info.toString()
    }));
  },
  [types.CLEAR_LOGS]: (state: State) => {
    state.logsList = [];
  }
};

// actions
const actions = {
  //发送错误日志
  async sendLogs(
    context: { commit: Commit, state: State }
  ): Promise<void> {
    // @ts-ignore
    await SERVICE["sendLogs"](state.logsList).then(() => {
      context.commit(types.CLEAR_LOGS);
    });
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  mutations,
  actions
}
