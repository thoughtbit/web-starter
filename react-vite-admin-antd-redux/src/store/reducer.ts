import { combineReducers } from "@reduxjs/toolkit";

import global from "./modules/global";
import auth from "./modules/auth";
import counter from "./modules/counter";
import user from "./modules/user";
import theme from "./modules/theme";
import demos from "./modules/demos";

const rootReducer = combineReducers({
  global,
  counter,
  auth,
  user,
  theme,
  demos,
});

export default rootReducer;
