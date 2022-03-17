import store from 'store2';

export const TOKEN_KEY = 'TOKEN';
export const USER_INFO_KEY = 'USER_INFO_KEY';

type StoredData = {
  [key: string]: any;
};

export default {
  // 后缀标识
  suffix: '__DEAD_TIME',
  get(key: string) {
    return store.get(key);
  },
  remove(key: string) {
    store.remove(key);
  },
  set(key: string, value: any) {
    if (value) {
      store.set(key, value, true);
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

  /**
   * 获取
   * @param {string} key 关键字
   */
  getItem(key: string) {
    return this.get(key);
  },

  /**
   * 设置
   * @param {string} key 关键字
   * @param {*} value 值
   * @param {number} expires 过期时间
   */
  setItem(key: string, value: any, expires?: any) {
    this.set(key, value);

    if (expires) {
      this.set(`${key}${this.suffix}`, Date.parse(String(new Date())) + expires * 1000);
    }
  },

  /**
   * 是否过期
   * @param {string} key 关键字
   */
  isExpired(key: string) {
    return (this.getExpiration(key) || 0) - Date.parse(String(new Date())) <= 2000;
  },

  /**
   * 获取到期时间
   * @param {string} key 关键字
   */
  getExpiration(key: string) {
    return this.get(key + this.suffix);
  },

  /**
   * 移除
   * @param {string} key 关键字
   */
  removeItem(key: string) {
    this.remove(key);
    this.removeExpiration(key);
  },

  /**
   * 移除到期时间
   * @param {string} key 关键字
   */
  removeExpiration(key: string) {
    this.remove(key + this.suffix);
  },
};
