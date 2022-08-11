import { combineReducers } from "@reduxjs/toolkit";

import global from "./modules/global";
import auth from "./modules/auth";
import counter from "./modules/counter";
import user from "./modules/user";

const createReducer = (asyncReducers?: any) => (state: any, action: any) => {
  const combinedReducer = combineReducers({
    global,
    counter,
    auth,
    user,
    ...asyncReducers,
  });

  /*
	Reset the redux store when user logged out
	 */
  if (action.type === 'auth/logout') {
    state = undefined;
  }

  return combinedReducer(state, action);
};

export default createReducer;
