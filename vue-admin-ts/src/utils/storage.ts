import localForage from "localforage";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants";

export default {
  createStorage(name?: string ) {
    return localForage.createInstance({
      name: name || "vue-admin-cache",
      version: 1.0
    });
  },
  async getItem(key: string) {
    return await localForage.getItem(key);
  },
  async removeItem(key: string) {
    return await localForage.removeItem(key);
  },
  async setItem(key: string, val: any) {
    if (val) {
      return await localForage.setItem(key, val);
    } else {
      return this.removeItem(key);
    }
  },
  async clear() {
    return await localForage.clear();
  },
  async getAccessToken() {
    return await this.getItem(ACCESS_TOKEN_KEY);
  },
  async setAccessToken(val: any) {
    if (val) {
      return await this.setItem(ACCESS_TOKEN_KEY, val);
    } else {
      return await this.removeItem(ACCESS_TOKEN_KEY);
    }
  },
  async getRefreshToken() {
    return await this.getItem(REFRESH_TOKEN_KEY);
  },
  async setRefreshToken(val: any) {
    if (val) {
      return await this.setItem(REFRESH_TOKEN_KEY, val);
    } else {
      return await this.removeItem(REFRESH_TOKEN_KEY);
    }
  }
};
