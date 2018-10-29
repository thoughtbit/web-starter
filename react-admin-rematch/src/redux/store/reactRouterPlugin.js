import { routerMiddleware, push, replace, go, goBack, goForward } from 'connected-react-router';
import { history } from './../../router';

const routerReducer = (state, { type, payload } = {}) => {
  if (type === '@@router/LOCATION_CHANGE') {
    return { ...state, ...payload }
  }

  return state
}

export function createReactRouterPlugin() {
  const middleware = routerMiddleware(history);
  return {
    middleware,
    config: {
      models: {
        router: {
          state: {
            action: '',
            location: {
              pathname: '',
              search: '',
              hash: ''
            }
          },
          baseReducer: routerReducer,
          effects: {
            push,
            replace,
            go,
            goBack,
            goForward
          }
        }
      }
    },
    onStoreCreated(store) {
      return {
        history
      }
    }
  }
}