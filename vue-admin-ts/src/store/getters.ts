import { State } from "@/store";

const getters = {
  logsList: (state: State): string[] => {
    return state.logs.logsList;
  },
  user: (state: State) => {
    // return state.app;
  },
  addRoutes: (state: State) => {
    // return state.permission.addRoutes;
  },
  routes: (state: State) => {
    // return state.permission.routes;
  }
};
export default getters;
