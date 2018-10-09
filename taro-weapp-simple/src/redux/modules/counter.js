import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

export const ADD = 'ADD'
export const MINUS = 'MINUS'

export const add = () => {
  return {
    type: ADD
  }
}
export const minus = () => {
  return {
    type: MINUS
  }
}

// 异步的action
export function asyncAdd () {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}

export default createReducer(fromJS({
  num: 0
}),{
  [ADD]: (state) => {
    const counterState = state.toJS()
    return state.merge({
      num: counterState.num + 1
    })
  },
  [MINUS]: (state) => {
    const counterState = state.toJS()
    return state.merge({
      num: counterState.num - 1
    })
  }
})
