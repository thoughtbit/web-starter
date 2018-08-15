/* eslint-disable */
function serialize(val) {
  return JSON.stringify(val);
}

function deserialize(val) {
  if (typeof val !== 'string') {
    return undefined;
  }
  try {
    return JSON.parse(val);
  } catch (e) {
    return val || undefined;
  }
}

let localStore = {
  version: '0.0.1',
  storage: window.localStorage,
  maxSize: 0,
  usedSize: 0,
};

const api = {
  /**
   * 写入某条缓存
   * @param {*} key
   * @param {*} val
   */
  set(key, val) {
    if (this.disabled) {
      return;
    }
    if (val === undefined) {
      return this.remove(key);
    }
    this.storage.setItem(key, serialize(val));
    return val;
  },
  /**
   * 读取某条缓存数据
   * @param {*} key
   * @param {*} def
   */
  get(key, def) {
    if (this.disabled) {
      return def;
    }
    let val = deserialize(this.storage.getItem(key));
    return (val === undefined ? def : val);
  },

  has(key) {
    return this.get(key) !== undefined;
  },
  /**
   * 删除某条缓存
   * @param {*} key
   */
  remove(key) {
    if (this.disabled) {
      return;
    }
    this.storage.removeItem(key);
  },
  /**
   * 清空所有
   */
  clear() {
    if (this.disabled) {
      return;
    }
    this.storage.clear();
  },
  /**
   * 获取所有缓存数据
   */
  getAll() {
    if (this.disabled) {
      return null;
    }
    let ret = {};
    this.forEach((key, val) => {
      ret[key] = val;
    });
    return ret;
  },
  /**
   * 遍历缓存，并执行回调
   * @param {*} callback
   */
  each(callback) {
    if (this.disabled) {
      return;
    }
    for (let i = 0; i < this.storage.length; i++) {
      let key = this.storage.key(i);
      callback(key, this.get(key));
    }
  },
  /**
   * 检测Localstorage 已占用存储量
   * @param {*} callback
   */
  getUsed(callback) {
    let size = 0;
    let rest = null;

    for (let item in this.storage) {
      if (this.storage.hasOwnProperty(item)) {
        size += this.get(item).length;
      }
    }
    this.usedSize = (size / 1024).toFixed(2);
    if (callback) callback(this.usedSize);

    return this.usedSize;
  },
  /**
   * 获取
   */
  getMaxLength() {
    let test = '0123456789';
    let maxSize = 0;
    let _this = this;

    const add = function (num) {
      num += num;
      if (num.length == 10240) {
        test = num;
        return;
      }
      add(num);
    };
    add(test);

    let sum = test;
    let show = setInterval(() => {
      sum += test;

      try {
        _this.remove('test');
        _this.set('test', sum);
      } catch (e) {
        _this.maxSize = (sum.length / 1024).toFixed(2);

        clearInterval(show);
      }
    }, 0.05);

    return this.maxSize;
  },
  /**
   *
   */
  getRest() {
    return this.maxSize - this.usedSize;
  },
};

Object.assign(localStore, api);


try {
  if (!localStore.storage) alert('浏览器不支持localStorage');

  const testKey = '__tinperStorageJS__';
  localStore.set(testKey, testKey);
  if (localStore.get(testKey) !== testKey) {
    localStore.disabled = true;
    console.log('存储量满，无法操作');
  }
  localStore.remove(testKey);
} catch (oException) {
  localStore.disabled = true;

  if (oException.name === 'QuotaExceededError') {
    console.log('超出本地存储限额！');
    // TODO
  }
}
window.localStore = localStore;
export default localStore;
