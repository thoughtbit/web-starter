import Taro from '@tarojs/taro';

class AuthService {
  constructor() {
    this.authenticated = false;
    this.store = null;
    this.auth = this.get();
  }

  init(store) {
    this.store = store;
  }

  set(auth) {
    Taro.setStorageSync('auth', auth);
  }

  get() {
    const auth = Taro.getStorageSync('auth');
    return auth || {};
  }

  clear() {
    this.auth = {};
    Taro.removeStorageSync('auth');
  }

  logout() {
    const state = this.store.getState();
    console.log('退出登录', state);
    this.clear();
    // 退出处理
  }
}

export default new AuthService();
