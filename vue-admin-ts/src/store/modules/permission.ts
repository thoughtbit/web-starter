import { Commit } from "vuex";
import * as types from "@/store/mutation-types";

interface RouteItem {
  name: string
  params: object
}

interface RouteMapItem {
  to: RouteItem
  from: RouteItem
}

export interface State {
  routeMap: RouteMapItem;
  routes: [];
  addRoutes: [];
  includes: [];
  openTarget: string[];
}

const initState: State = {
  routeMap: <RouteMapItem>{
    to: { name: "/", params: {} },
    from: { name: "/", params: {} }
  },
  routes: [],
  addRoutes: [],
  includes: [],
  openTarget: ["https://www.site.com"]
};

// getters
const getters = {};

// mutations
const mutations = {
  [types.SET_ROUTE_MAP]: (state: State, routeMap: RouteMapItem) => {
    state.routeMap = routeMap;
  },
  [types.SET_ROUTES]: (state: State, data: any) => {
    state.addRoutes = data
    const root = data.find((d: any) => d.path === "/");
    state.routes = root ? root.children : [];
    // console.log(state.addRoutes, state.routes)
  },
  [types.SET_INCLUDES]: (state: State, data: any) => {
    state.includes = data
  }
};

// actions
const actions = {
  currentRoute(context: { commit: Commit }, params: { routeMap: RouteMapItem }): void {
    context.commit(types.SET_ROUTE_MAP, params);
  },
  asyncIncludes (context: { commit: Commit, state: State }, params: string[]): void {
    context.commit("SET_INCLUDES", params)
  },
  addIncludes (context: { commit: Commit, state: State }, path: any):void {
    let includes = context.state.includes;
    // @ts-ignore
    if (includes.indexOf(path) < 0) {
      // @ts-ignore
      includes.push(path);
    }
    context.commit("SET_INCLUDES", includes);
  },
  delIncludes (context: { commit: Commit, state: State }, path: string) {
    let includes = context.state.includes.filter((i: any) => {
      return i !== path;
    });
    context.commit("SET_INCLUDES", includes);
  }
};

export default {
  namespaced: true,
  state: initState,
  getters,
  mutations,
  actions
};
