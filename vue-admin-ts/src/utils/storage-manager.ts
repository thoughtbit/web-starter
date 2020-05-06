import store from "store2";
import { TOKEN_KEY, ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants";

interface StoredData {
  [key: string]: any;
}

export default {
  getItem(key: string) {
    return store.get(key);
  },
  removeItem(key: string) {
    store.remove(key);
  },
  setItem(key: string, val: any) {
    if (val) {
      store.set(key, val, true);
    } else {
      store.remove(key);
    }
  },
  setAll(data: StoredData) {
    store.setAll(data, true);
  },
  getAll() {
    return store.getAll();
  },
  clear() {
    store.clear();
  },
  has(key: string) {
    return store.has(key);
  },
  getToken() {
    return this.getItem(TOKEN_KEY);
  },
  setToken(val: any) {
    this.setItem(TOKEN_KEY, val);
  },
  removeToken() {
    this.removeItem(TOKEN_KEY);
  },
  getAccessToken() {
    return this.getItem(ACCESS_TOKEN_KEY);
  },
  setAccessToken(val: any) {
    if (val) {
      this.setItem(ACCESS_TOKEN_KEY, val);
    } else {
      this.removeItem(ACCESS_TOKEN_KEY);
    }
  },
  getRefreshToken() {
    return this.getItem(REFRESH_TOKEN_KEY);
  },
  setRefreshToken(val: any) {
    if (val) {
      this.setItem(REFRESH_TOKEN_KEY, val);
    } else {
      this.removeItem(REFRESH_TOKEN_KEY);
    }
  },
  removeAllToken () {
    this.removeItem(ACCESS_TOKEN_KEY);
    this.removeItem(REFRESH_TOKEN_KEY);
  }
};
