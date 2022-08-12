import { combineReducers } from "@reduxjs/toolkit";

import global from "./modules/global";
import auth from "./modules/auth";
import counter from "./modules/counter";
import user from "./modules/user";

const rootReducer = combineReducers({
  global,
  counter,
  auth,
  user,
});

export default rootReducer;
