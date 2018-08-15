import ApiService from './../../service/api.service';
import JwtService from './../../service/jwt.service';
import { LOGIN, LOGOUT, REGISTER, CHECK_AUTH } from './actions.type';
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from './mutations.type';

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken(),
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
};

const actions = {
  [LOGIN](context, credentials) {
    return new Promise((resolve) => {
      ApiService
        .post(`/user/login?userPhone=${credentials.phone}&userPassword=${credentials.password}`)
        .then(({ data }) => {
          if (data.token) {
            context.commit(SET_AUTH, {
              token: data.token,
              ...data.sessionUser,
            });
            resolve(data);
          } else {
            context.commit(SET_ERROR, data.msg);
          }
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, '登录服务异常');
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService
        .post('users', { user: credentials })
        .then(({ data }) => {
          context.commit(SET_AUTH, data.user);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
        });
    });
  },
  [CHECK_AUTH](context) {
    if (JwtService.getToken()) {
      // ApiService.setHeader(); // header 传token
      ApiService
        .get('/user/getUser', { userId: JwtService.getUserId() })
        .then(({ data }) => {
          context.commit(SET_AUTH, {
            token: JwtService.getToken(),
            ...data.sessionUser,
          });
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, '验证用户服务异常');
        });
    } else {
      context.commit(PURGE_AUTH);
    }
  },
  // [UPDATE_USER](context, payload) {
  //   const { username, password } = payload;
  //   const user = {
  //     username,
  //   };
  //   if (password) {
  //     user.password = password;
  //   }

  //   return ApiService
  //     .put('user', user)
  //     .then(({ data }) => {
  //       context.commit(SET_AUTH, data.user);
  //       return data;
  //     });
  // },
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
    JwtService.saveToken(state.user.token);
    JwtService.saveUserId(state.user.id);
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
    JwtService.destroyUserId();
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
