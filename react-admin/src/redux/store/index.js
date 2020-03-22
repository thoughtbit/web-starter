import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import ApiService, { getApi } from './../../services/api.service';
import AuthService from './../../services/auth.service';
import WebSocketService from './../../services/ws.service';
import { history } from './../../router';
import createRootReducer from './../models';

const router = routerMiddleware(history);

// NOTE: Do not change middleware delaration pattern since rekit plugins may register middleware to it.
const middlewares = [
  // 把API接口单列扩展到 action 参数里
  reduxThunk.withExtraArgument(getApi),
  router,
];

let devToolsExtension = f => f;

/* istanbul ignore if  */
if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger').createLogger;

  const logger = createLogger({ collapsed: true });
  middlewares.push(logger);

  if (window.devToolsExtension) {
    devToolsExtension = window.devToolsExtension();
  }
}

export default function configureStore(initialState = {}) {
  const store = createStore(
    createRootReducer(history),
    initialState,
    compose(applyMiddleware(...middlewares), devToolsExtension)
  );

  ApiService.init(store);
  AuthService.init(store);
  WebSocketService.init(store);

  return store;
}
