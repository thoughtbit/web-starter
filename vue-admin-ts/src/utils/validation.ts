function isValidUsername(str: string) {
  // const validMap = ["admin", "editor"];
  // return validMap.indexOf(str.trim()) >= 0;
  return str.length > 3;
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
function validURL(url: string) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

// 小写字母
function validateLowerCase(str: string) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

// 大写字母
function validateUpperCase(str: string) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

// 大小写字母
function validateAlphabets(str: string) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
function isArray(arg: any) {
  if (typeof Array.isArray === "undefined") {
    return Object.prototype.toString.call(arg) === "[object Array]";
  }
  return Array.isArray(arg);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
function isString(str: any) {
  return typeof str === "string" || str instanceof String;
}

function validEmail(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validNumber(value: number) {
  const re = /^\d+$/;
  return re.test(String(value));
}

export {
  isValidUsername,
  isExternal,
  validURL,
  validateLowerCase,
  validateAlphabets,
  isArray,
  validEmail,
  isString,
  validNumber
};
