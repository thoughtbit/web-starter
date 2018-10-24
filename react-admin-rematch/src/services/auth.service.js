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
    localStorage.setItem("auth", JSON.stringify(this.auth));
  }

  get() {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth || {};
  }

  clear() {
    this.auth = {};
    localStorage.removeItem("auth");
  }

  logout() {
    const state = this.store.getState();
    console.log('退出登录', state);
    this.clear();
    // 退出处理
  }
}

export default new AuthService();
