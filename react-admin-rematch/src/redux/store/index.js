import { init } from '@rematch/core'
import createLoadingPlugin from '@rematch/loading';
import createSelectPlugin from '@rematch/select';
// import createRematchPersist from '@rematch/persist';
import reduxThunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';
import { createReactRouterPlugin } from './reactRouterPlugin';
import ApiService, { getApi } from './../../services/api.service';
import AuthService from './../../services/auth.service';
import WebSocketService from './../../services/ws.service';
import * as models from './../models';

const router = routerMiddleware(createHistory());

// NOTE: Do not change middleware delaration pattern since rekit plugins may register middleware to it.
const middlewares = [
  // 把API接口单列扩展到 action 参数里
  reduxThunk.withExtraArgument(getApi),
  router,
];

const isDevelopment = process.env.NODE_ENV === 'development';

/* Logger */
if (isDevelopment) {
  const createLogger = require('redux-logger').createLogger;

  const logger = createLogger({ collapsed: true });
  middlewares.push(logger);
}

const loadingPlugin = createLoadingPlugin({});

// const persistPlugin = createRematchPersist({
//   whitelist: [],
//   throttle: 2000,
//   version: 1,
// });

const reactRouterPlugin = createReactRouterPlugin();
const selectPlugin = createSelectPlugin();

export default function configureStore(initialState = {}) {
  const store = init({
    models,
    plugins: [reactRouterPlugin, loadingPlugin, selectPlugin, /*persistPlugin*/],
    redux: {
      initialState,
      devtoolOptions: {
        disabled: !isDevelopment,
      },
      middlewares
    }
  });

  ApiService.init(store);
  AuthService.init(store);
  WebSocketService.init(store);

  return store;
}
