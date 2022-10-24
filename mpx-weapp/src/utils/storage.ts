import mpx from '@mpxjs/core';

export const TOKEN_KEY = 'TOKEN';
export const OPEN_ID_KEY = 'OPEN_ID'; // 微信 code
export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
export const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';
export const USER_INFO_KEY = 'USER_INFO_KEY';

export default {
  // 后缀标识
  suffix: '__DEAD_TIME',

  /**
   * 获取
   * @param {string} key 关键字
   */
  get(key: string) {
    return mpx.getStorageSync(key);
  },

  /**
   * 设置
   * @param {string} key 关键字
   * @param {*} value 值
   * @param {number} expires 过期时间
   */
  set(key: string, value: any, expires?: any) {
    mpx.setStorageSync(key, value);

    if (expires) {
      mpx.setStorageSync(`${key}${this.suffix}`, Date.parse(String(new Date())) + expires * 1000);
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
  remove(key: string) {
    mpx.removeStorageSync(key);
    this.removeExpiration(key);
  },

  /**
   * 移除到期时间
   * @param {string} key 关键字
   */
  removeExpiration(key: string) {
    mpx.removeStorageSync(key + this.suffix);
  },

  /**
   * 清理
   */
  clear() {
    mpx.clearStorageSync();
  },
};
