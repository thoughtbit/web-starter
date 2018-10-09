import { defineAction } from 'redux-define';
import { createReducer } from 'redux-create-reducer';

// status
const Status = {
  LOADING: 'loading',
  SUCCESS: 'success',
  FAILURE: 'failure',
};

const initialState = {
  isFetching: false,
  requestQuantity: 0, // 当前应用中正在进行的API请求数
  error: null, // 应用全局错误信息
  status: Status.LOADING,
};

// action types
export const TYPES = defineAction(
  'FETCH',
  ['REQUEST', 'SUCCESS', 'FAILURE', 'REMOVE_ERROR'],
  'app'
);

// action creators
export const actions = {
  fetchStarted: () => ({
    type: TYPES.REQUEST,
  }),
  fetchSuccess: () => ({
    type: TYPES.SUCCESS,
  }),
  fetchFailure: error => ({
    type: TYPES.FAILURE,
    error,
  }),
  removeError: () => ({
    type: TYPES.REMOVE_ERROR,
  }),
};

// reducers
const reducer = createReducer(initialState, {
  // 异步请求正在进行中
  [TYPES.REQUEST](state) {
    return {
      ...state,
      status: Status.LOADING,
      isFetching: true,
      // 每接收一个API请求开始的action，requestQuantity加1
      requestQuantity: state.requestQuantity + 1,
    };
  },
  // 异步请求成功
  [TYPES.SUCCESS](state) {
    return {
      ...state,
      status: Status.SUCCESS,
      isFetching: false,
      // 每接收一个API请求结束的action，requestQuantity减1
      requestQuantity: state.requestQuantity - 1,
    };
  },
  // 异步请求失败
  [TYPES.FAILURE](state, action) {
    return {
      ...state,
      status: Status.FAILURE,
      isFetching: false,
      // 每接收一个API请求结束的action，requestQuantity减1
      requestQuantity: state.requestQuantity - 1,
      error: action.payload,
    };
  },
  // 清除错误
  [TYPES.REMOVE_ERROR](state) {
    return {
      ...state,
      error: null,
    };
  },
});

export default reducer;

// selectors
export const getError = state => {
  return state.app.error;
};

export const getLoading = state => {
  return state.app.isFetching;
};

export const getRequestQuantity = state => {
  return state.app.requestQuantity;
};
