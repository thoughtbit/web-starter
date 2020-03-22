import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import app from './app';
import auth from './auth';
import counter from './counter';

// 合并所有模块的reducer成一个根reducer
const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  app,
  auth,
  counter
});

export default createRootReducer;
