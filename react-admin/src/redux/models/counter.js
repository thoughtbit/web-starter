const initialState = {
  num: 0,
};

// action types
export const TYPES = {
  ADD: "COUNTER/ADD",    // 加
  MINUS: "COUNTER/MINUS"   // 减
};

// action creators
export const actions = {
  add: () => {
    return {
      type: TYPES.ADD
    }
  },
  minus: () => {
    return {
      type: TYPES.MINUS
    }
  },
  // 异步的action
  asyncAdd: () => {
    return dispatch => {
      setTimeout(() => {
        dispatch(actions.add())
      }, 2000)
    };
  },
};

// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.ADD:
      return {
        ...state,
        num: state.num + 1
      }
     case TYPES.MINUS:
       return {
         ...state,
         num: state.num - 1
       }
     default:
       return state
  }
};

export default reducer;