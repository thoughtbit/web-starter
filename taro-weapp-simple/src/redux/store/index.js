import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './../modules';
import ApiService, { getApi } from './../../services/api.service';
import AuthService from './../../services/auth.service';
import WebSocketService from './../../services/ws.service';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const middlewares = [
  // 把API接口单列扩展到 action 参数里
  thunkMiddleware.withExtraArgument(getApi)
]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(require('redux-logger').createLogger());
}

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
  // other store enhancers if any
)

export default function configStore () {
  const store = createStore(rootReducer, enhancer);

  ApiService.init(store);
  AuthService.init(store);
  WebSocketService.init(store);

  return store;
}
