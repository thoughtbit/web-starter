import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './../modules';
import { getApi } from '../../services/api.service';

const loggerMiddleware = createLogger({
  predicate: (getState, action) => __DEV__,
});

const middlewares = [
  // 把API接口单列扩展到 action 参数里
  thunkMiddleware.withExtraArgument(getApi),
  loggerMiddleware
]

export default function configStore (initialState = {}) {
  const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares))

  ApiService.init(store);
  WebSocketService.init(store);
  AuthService.init(store);

  return store
}
