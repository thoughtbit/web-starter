// import Taro from '@tarojs/taro';
import AuthService from './auth.service';
import ApiConfig from '../config/api.config';
import { HttpClient } from '../common/http';

class ApiService {
  constructor(store) {
    this.store = store;
    this.http = new HttpClient();
    this.http.interceptors.request.push((url, options) => {
      console.log('拦截HTTP请求处理结果: ', options);
      const nextOptions = options;

      // const { user, isAuthenticated } = this.store.auth;
      // if (user && isAuthenticated) {
      //   nextOptions.header.Authorization = `Bearer ${user.token}`;
      // }

      if (AuthService.auth) {
        nextOptions.header.Authorization = `Bearer ${AuthService.auth.token}`;
      }
     
      return { url, options: nextOptions };
    });

    this.http.interceptors.response.push((response) => {
      console.log('拦截HTTP响应处理结果: ', response);
      const { user, isAuthenticated } = this.store.auth;
      const { code } = response;

      if (user && isAuthenticated && code === 401) {
        // 跳转登录页面
        AuthService.logout();
      }
      return response;
    });
  }
  
  request(url, options) {
    return this.http.request(url, options);
  }

  /**
   * 用户管理服务
   */
  // 用户登录
  login(params) {
    return this.http.post(ApiConfig.APP_BASE_API.LOGIN_URL, params);
  }
  // 找回密码
  findPassword(params) {
    return this.http.post(ApiConfig.APP_BASE_API.FIND_PASSWORD_URL, params);
  }
  // 修改密码
  modifyPassword(params) {
    return this.http.post(ApiConfig.APP_BASE_API.MODIFY_PASSWORD_URL, params);
  }
  // 用户注册
  signup(params) {
    return this.http.post(ApiConfig.APP_BASE_API.SIGNUP_URL, params);
  }
  // 查询用户
  getUser() {
    return this.http.get(ApiConfig.APP_BASE_API.USER_INFO_URL);
  }
  
  /**
   * 用户列表管理服务
   */
  getUsers(params) {
    return this.http.get(ApiConfig.APP_BASE_API.USER_URL, params);
  }
  createUser(params) {
    return this.http.post(ApiConfig.APP_BASE_API.USERS_URL, params);
  }
  updateUser(params) {
    return this.http.update(ApiConfig.APP_BASE_API.USERS_URL, params);
  }
  destroyUser() {
    return this.http.delete(ApiConfig.APP_BASE_API.USERS_URL);
  }
}

const getApi = (getState) => {
  const state = getState();
  // console.log('全局状态树：', state);
  return new ApiService(state);
};

export { getApi }
