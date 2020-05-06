import { State } from "@/store";

const getters = {
  setting: (state: State) => state.app.setting,
  logsList: (state: State): string[] => state.logs.logsList,
  userInfo: (state: State) => state.auth.userInfo,
  accessToken: (state: State) => state.auth.token.access_token,
  refreshToken: (state: State) => state.auth.token.refresh_token,
  expiresIn: (state: State) => state.auth.token.expires_in,
  routings: (state: State) => state.permission.routings,
  addRoutes: (state: State) => state.permission.addRoutes,
  routes: (state: State) => state.permission.routes
};
export default getters;
