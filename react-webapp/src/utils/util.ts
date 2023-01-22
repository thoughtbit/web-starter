import dayjs from "dayjs";

const opt = Object.prototype.toString;

export function isArray(obj: unknown): obj is any[] {
  return opt.call(obj) === "[object Array]";
}

export function isNull(obj: unknown): obj is null {
  return opt.call(obj) === "[object Null]";
}

export function isBoolean(obj: unknown): obj is boolean {
  return opt.call(obj) === "[object Boolean]";
}

export function isObject(obj: unknown): obj is { [key: string]: unknown } {
  return opt.call(obj) === "[object Object]";
}

export const isPromise = <T>(obj: unknown): obj is Promise<T> => {
  return opt.call(obj) === "[object Promise]";
};

export function isString(obj: unknown): obj is string {
  return opt.call(obj) === "[object String]";
}

export function isNumber(obj: unknown): obj is number {
  return opt.call(obj) === "[object Number]" && obj === obj; // eslint-disable-line
}

export function isDate(obj: unknown) {
  return opt.call(obj) === "[object Date]";
}

export function isUndefined(obj: unknown): obj is undefined {
  return obj === undefined;
}

export function isFunction(obj: unknown): obj is (...args: any[]) => any {
  return typeof obj === "function";
}

export function minMax(val: number, min: number, max: number) {
  if (val < min) return min;
  if (val > max) return max;
  return val;
}

export function promiseTimeout(ms: number, throwOnTimeout = false, reason = "Timeout"): Promise<void> {
  return new Promise((resolve, reject) => {
    if (throwOnTimeout) setTimeout(() => reject(reason), ms);
    else setTimeout(resolve, ms);
  });
}

export function invoke<T>(fn: () => T): T {
  return fn();
}

export const now = () => Date.now();
export const timestamp = () => +Date.now();
export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
export const rand = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * 解析当前菜单对应的路由
 * @param path1
 * @param path2
 */
export const resolve = (path1 = "", path2 = "") => {
  let separator = "/";
  if (path1.endsWith("/") || path2.startsWith("/")) {
    separator = "";
  }
  return `${path1}${separator}${path2}`;
};

/**
 * 判断是否是外链
 * @param {string} path
 * @returns {Boolean}
 * @author LiQingSong
 */
export const isExternal = (path: string): boolean => /^(https?:|mailto:|tel:)/.test(path);

export const formatTime = (date: any, template: string) => dayjs(date).format(template);
