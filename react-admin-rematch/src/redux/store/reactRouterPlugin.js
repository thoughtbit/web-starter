import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import router from './../models/router';

export function createReactRouterPlugin() {
  const browserHistory = createHistory()
  const middleware = routerMiddleware(browserHistory)
  return {
    middleware,
    config: {
      models: {
        router
      }
    },
    onStoreCreated(store) {
      return {
        browserHistory
      }
    }
  }
}