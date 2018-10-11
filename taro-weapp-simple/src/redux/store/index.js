import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './../modules';
import ApiService, { getApi } from './../../services/api.service';
import AuthService from './../../services/auth.service';
import WebSocketService from './../../services/ws.service';

const middlewares = [
  // 把API接口单列扩展到 action 参数里
  thunkMiddleware.withExtraArgument(getApi),
  createLogger()
]

export default function configStore (initialState = {}) {
  const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares));

  ApiService.init(store);
  AuthService.init(store);
  WebSocketService.init(store);

  return store
}
