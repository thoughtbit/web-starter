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

function validMobile(phone: string) {
  const re = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
  return re.test(phone);
}

/**
 * 判断邮箱地址是否正确
 */
function isValidateEmail(email: string) {
  const list = [];
  let result = true;
  let msg = '';
  if (!validateNull(email)) {
    if (!validEmail(email)) {
      msg = '邮箱格式不正确'
    } else {
      result = false
    }
  } else {
    msg = '邮箱地址不能为空'
  }
  list.push(result);
  list.push(msg);
  return list;
}

/**
 * 判断手机号码是否正确
 */
function isValidateMobile(phone: string) {
  const list = [];
  let result = true;
  let msg = '';
  if (!validateNull(phone)) {
    if (phone.length >= 11) {
      if (!validMobile(phone)) {
        msg = '手机号码格式不正确'
      } else {
        result = false
      }
    } else {
      msg = '手机号码长度不为11位'
    }
  } else {
    msg = '手机号码不能为空'
  }
  list.push(result);
  list.push(msg);
  return list;
}

/**
 * 判断是否为空
 */
function validateNull(val: any) {
  if (typeof val === "boolean") {
    return false;
  }
  if (typeof val === "number") {
    return false;
  }
  if (val instanceof Array) {
    if (val.length === 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true;
  } else {
    if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true;
    return false;
  }
  return false;
}

export {
  isExternal,
  validURL,
  validateLowerCase,
  validateAlphabets,
  isArray,
  validEmail,
  isString,
  validNumber,
  validateNull,
  isValidateMobile,
  validMobile,
  isValidateEmail
};
