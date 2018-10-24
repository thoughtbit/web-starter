import {
  routerReducer,
  push,
  replace,
  go,
  goBack,
  goForward
} from 'react-router-redux'

export default {
  baseReducer: routerReducer,
  effects: {
    push,
    replace,
    go,
    goBack,
    goForward
  }
}