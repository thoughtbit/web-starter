import { Commit, Dispatch } from "vuex";
import router, { exceptionRoutes, filterAsyncRoutes, rootRoute } from "@/router";
import SERVICE from "@/core/lib/sevice";
import * as types from "@/store/mutation-types";
import { Logger } from "@/utils/logger";

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
  routings: any[],
  routes: any[];
  addRoutes: any[];
  includes: any[];
  excludes: any[];
  openTarget: string[];
}

const initState: State = {
  routeMap: <RouteMapItem>{
    to: { name: "/", params: {} },
    from: { name: "/", params: {} }
  },
  routings: [], // 权限标识
  routes: [], // 路由列表
  addRoutes: [],
  includes: [],
  excludes: [],
  openTarget: []
};

// getters
const getters = {
  routings: (state: State) => state.routings,
  addRoutes: (state: State) => state.addRoutes,
  routes: (state: State) => state.routes,
};

// mutations
const mutations = {
  [types.SET_ROUTE_MAP]: (state: State, routeMap: RouteMapItem) => {
    state.routeMap = routeMap;
  },
  [types.SET_ROUTES]: (state: State, data: any) => {
    const { routings, routes } = data;
    state.routings = routings;
    state.addRoutes = routes;
    const root = routes.find((d: any) => d.path === "/");
    state.routes = root ? root.children : [];

    // console.log("新增路由:", state.addRoutes, "全部路由:", state.routes);
  },
  [types.SET_EXCLUDES]: (state: State, data: any) => {
    state.excludes = data;
  },
  [types.SET_INCLUDES]: (state: State, data: any) => {
    state.includes = data;
  },
  [types.CLEAR_ROUTES]: (state: State) => {
    state.addRoutes = [];
    state.routes = [];
    state.excludes = [];
    state.includes = [];
    state.routings= [];
  }
};

// actions
const actions = {
  currentRoute(context: { commit: Commit }, params: { routeMap: RouteMapItem }): void {
    context.commit(types.SET_ROUTE_MAP, params);
  },
  async generateRoutes(context: { commit: Commit, state: State, dispatch: Dispatch }): Promise<any[]> {
    // @ts-ignore
    return await SERVICE["getMenusPermission"]().then((res) => {
      // Logger.info("权限路由", "PermissionState", res)();
      if (res.code === 202) {
        const routes = res.data.menus.concat(exceptionRoutes)
        let accessedRoutes = filterAsyncRoutes(routes)
        const { routings, menus } = res.data;

        context.commit("SET_ROUTES", {
          routings,
          routes: [{
            ...rootRoute,
            children: menus
          }]
        })
        return [{
          ...rootRoute,
          children: accessedRoutes
        }]
      } else {
        router.push("/login");
      }

      return [];
    });
  },
  asyncIncludes (context: { commit: Commit, state: State }, params: string[]): void {
    context.commit("SET_INCLUDES", params)
  },
  addExcludes (context: { commit: Commit, state: State }, path: string) {
    let excludes = context.state.excludes;
    if (excludes.indexOf(path) < 0) {
      excludes.push(path)
    }
    context.commit("SET_EXCLUDES", excludes)
  },
  delExcludes (context: { commit: Commit, state: State }, path: string) {
    let excludes = context.state.excludes.filter(e => e !== path);
    context.commit("SET_EXCLUDES", excludes);
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
  },
  clear(context: { commit: Commit}) {
    context.commit("CLEAR_ROUTES");
  }
};

export default {
  namespaced: true,
  state: initState,
  getters,
  mutations,
  actions
};
