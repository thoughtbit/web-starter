import Taro from '@tarojs/taro';
// import ApiService from "./api.service";

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
    ["access-token", "token-type", "client", "expiry", "uid"].forEach(key => {
      if (auth[key]) this.auth[key] = auth[key];
    });
    Taro.setStorageSync("auth", this.auth);
  }

  get() {
    const auth = Taro.getStorageSync("auth");
    return auth || {};
  }

  clear() {
    this.auth = {};
    Taro.removeStorageSync("auth");
  }
}

export default new AuthService();
