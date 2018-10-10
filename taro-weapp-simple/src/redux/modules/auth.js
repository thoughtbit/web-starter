import { createReducer } from 'redux-create-reducer';
import { actions as appActions } from "./apps";

const initialState = {
  userId: null,
  username: null
};

// action types
export const TYPES = {
  LOGIN: "AUTH/LOGIN",    //登录
  LOGOUT: "AUTH/LOGOUT"   //注销
};

// action creators
export const actions = {
  // 异步action，执行登录验证
  login: (username, password) => {
    return dispatch => {
      // 每个API请求开始前，发送app模块定义的startRequest action
      dispatch(appActions.startRequest());
      const params = { username, password };
      console.log('params:', params);
      // return post('', params).then(data => {
      //   // 每个API请求结束后，发送app模块定义的finishRequest action
      //   dispatch(appActions.finishRequest());
      //   // 请求返回成功，保存登录用户的信息，否则，设置全局错误信息
      //   if (!data.error) {
      //     dispatch(actions.setLoginInfo(data.userId, username));
      //   } else {
      //     dispatch(appActions.setError(data.error));
      //   }
      // });
    };
  },
  logout: () => ({
    type: TYPES.LOGOUT
  }),
  setLoginInfo: (userId, username) => ({
    type: TYPES.LOGIN,
    userId: userId,
    username: username
  })
};

// reducers
const reducer = createReducer(initialState, {
  // 登录
  [TYPES.LOGIN](state, action) {
    return {
      ...state,
      userId: action.userId,
      username: action.username
    };
  },
  // 退出
  [TYPES.LOGOUT](state) {
    return {
      ...state,
      userId: null,
      username: null
    };
  }
});

export default reducer;

// selectors
export const getLoggedUser = state => state.auth;
