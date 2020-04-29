import store from "store2";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants";

interface StoredData {
  [key: string]: any;
}

export default {
  getItem(key: string) {
    return store.get(key);
  },
  removeItem(key: string) {
    return store.remove(key);
  },
  setItem(key: string, val: any) {
    if (val) {
      return store.set(key, val, true);
    } else {
      return store.remove(key);
    }
  },
  setAll(data: StoredData) {
    return store.setAll(data, true);
  },
  getAll() {
    return store.getAll();
  },
  clear() {
    return store.clear();
  },
  has(key: string) {
    return store.has(key);
  },

  getAccessToken() {
    return this.getItem(ACCESS_TOKEN_KEY);
  },
  setAccessToken(val: any) {
    if (val) {
      return this.setItem(ACCESS_TOKEN_KEY, val);
    } else {
      return this.removeItem(ACCESS_TOKEN_KEY);
    }
  },
  getRefreshToken() {
    return this.getItem(REFRESH_TOKEN_KEY);
  },
  setRefreshToken(val: any) {
    if (val) {
      return this.setItem(REFRESH_TOKEN_KEY, val);
    } else {
      return this.removeItem(REFRESH_TOKEN_KEY);
    }
  },
  clearToken () {
    this.removeItem(ACCESS_TOKEN_KEY);
    this.removeItem(REFRESH_TOKEN_KEY);
  }
};
