import { Commit } from "vuex";

import { getLocale } from "@/locales";
import * as types from "@/store/mutation-types";

export interface State {
  language: string;
  setting: {
    id: string,
    aduitMemberFlowId: string,
    dataBackupsMemory: any,
    attrs: any
  },
}

const initState: State = {
  language: getLocale(),
  setting: {
    id: "",
    aduitMemberFlowId: "",
    dataBackupsMemory: {},
    attrs: {}
  },
};

// getters
const getters = {
  language: (state: State) => {
    return state.language;
  }
};

// mutations
const mutations = {
  [types.SET_LANGUAGE](state: State, language: string): void {
    state.language = language;
  },
};

// actions
const actions = {
  setLanguage(context: { commit: Commit }, params: { language: string }): void {
    context.commit(types.SET_LANGUAGE, params);
  }
};

export default {
  namespaced: true,
  state: initState,
  getters,
  mutations,
  actions
};
