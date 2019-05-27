import { createReducer } from 'redux-create-reducer';
import { actions as appActions } from './apps';
import AuthService from './../../services/auth.service';

const initialState = {
  isAuthenticated: false,
  user: null
};

// action types
export const TYPES = {
  LOGIN: 'AUTH/LOGIN',    //登录
  LOGOUT: 'AUTH/LOGOUT',   //注销
};

// action creators
export const actions = {
  // 异步action，执行登录验证
  login: (username, password) => {
    return async (dispatch, getState, getApi) => {
      // 每个API请求开始前，发送app模块定义的startRequest action
      dispatch(appActions.startRequest());
      dispatch(appActions.removeError());
      return await getApi(getState)
        .login({ username, password })
        .then((res) => {
          const { data } = res;
          const user = {
            id: data.id,
            username,
            token: data.token
          }

          // 本地保存登录认证
          AuthService.set(user);

          // 每个API请求结束后，发送app模块定义的finishRequest action
          dispatch(appActions.finishRequest());
          // 请求返回成功，保存登录用户的信息
          dispatch(actions.setLoginInfo(user));
          return Promise.resolve(res);
        }).catch((error) => {
          dispatch(appActions.setError(error.message));
          return Promise.reject(error);
        });
    };
  },
  logout: ()  => {
    return async (dispatch) => {
      // 本地保存登录认证
      await AuthService.clear();

      // 退出登录
      dispatch({ type: TYPES.LOGOUT });
    }
  },
  // logout: () => ({
  //   type: TYPES.LOGOUT,
  // }),
  setLoginInfo: (user) => ({
    type: TYPES.LOGIN,
    user
  }),
  setToken: (user) => ({
    type: TYPES.SET_AUTH,
    user
  }),
};

// reducers
const reducer = createReducer(initialState, {
  // 登录
  [TYPES.LOGIN](state, action) {
    return {
      ...state,
      user: action.user,
      isAuthenticated: true
    };
  },
  // 退出
  [TYPES.LOGOUT](state) {
    return {
      ...state,
      user: null,
      isAuthenticated: false
    };
  },
});

export default reducer;

// selectors
export const getLoggedUser = state => state.auth;
