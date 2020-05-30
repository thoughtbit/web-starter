import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import qs from "qs";
import { Message } from "element-ui";
import router from "@/router";
import store from "@/store";
import StorageManager from "@/utils/storage-manager";
import { ExtendConfig, RestAPI, Get, APIConfig } from "@/types/http";
import { Logger } from "@/utils/logger";

// 创建取消请求令牌
const CancelToken = axios.CancelToken;

const defaultConfig = {
  // 请求超时时间
  timeout: 20000,
  // @ts-ignore
  validateStatus: (status) => {
    // 成功状态码范围
    return status >= 200 && status < 500;
  },
  headers: {
    // 设置默认请求头
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json, text/plain, */*",
    "Access-Control-Allow-Headers": "Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin"
  }
};

const instance: AxiosInstance = axios.create(defaultConfig);

// 默认错误处理方式
const onError = (error: AxiosResponse | any) => {
  // Logger.info("onError", "网络请求", error)();
  let errorMessage = error?.message ?? "未知异常";
  const response = error?.response;
  const status = error?.status ?? -1000;
  if (response) {
    switch (status) {
      case 500: errorMessage = "服务器内部错误(500)"; break;
      case 501: errorMessage = "服务未实现(501)"; break;
      case 502: errorMessage = "网络错误(502)"; break;
      case 503: errorMessage = "服务不可用(503)"; break;
      case 504: errorMessage = "网络超时(504)"; break;
      case 505: errorMessage = "HTTP版本不受支持(505)"; break;
      default:
        errorMessage = `服务错误类型(${response.status})`;
    }
  } else {
    if (!window.navigator.onLine) {
      errorMessage = '网络被外星人劫持了';
    }
    if(errorMessage.match(/network error/gi)) {
      errorMessage = "网络似乎出了点问题";
    }
    if (errorMessage.match("timeout")) {
      errorMessage = "网络不给力啊悲剧";
    }
  }

  if (error.message) {
    Message({
      showClose: true,
      message: errorMessage,
      type: "error",
      duration: 3 * 1000
    });
  }

  return {
    code: status,
    message: errorMessage
  }
};

// 处理网络请求带来的校验
const checkStatus = (response: AxiosResponse) => {
  Logger.info("checkStatus", "网络请求", response)();

  // -1000 自己定义，连接错误的status
  const status = response?.status ?? -1000;

  // 401: 未登录
  // 未登录则跳转登录页面，并携带当前页面的路径
  // 在登录成功后返回当前页面，这一步需要在登录页操作。
  if (status === 401) {
    StorageManager.removeToken();
    const url = window.location.hash.substr(1);
    if (/^\/login/.test(url)) {
      router.push(url);
    } else {
      router.push(`/login?redirect=${escape(url)}`);
    }
  }
  // 403 Token过期
  // 登录过期对用户进行提示
  // 清除本地token和清空vuex中token对象
  // 跳转登录页面
  if (status === 403) {
    Message({
      showClose: true,
      message: "登录过期, 请重新登录",
      type: "error",
      duration: 3 * 1000
    });
    StorageManager.removeToken();
    // store.commit(`auth/${SET_LOGIN_STATUS}`, false);
    // setTimeout(() => {
    //   router.replace({
    //     path: "/login",
    //     query: {
    //       redirect: router.currentRoute.fullPath
    //     }
    //   });
    // }, 1000);
  }
  if ((status >= 200 && status < 300) || status === 304 || status === 400 || status === 404) {
    return response.data;
  }

  return {
    code: status,
    message: "服务异常"
  };
};

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const conf = config;
    const { method } = config;
    // 得到参数中的 requestName 字段，用于决定下次发起请求，取消对应的 相同字段的请求
    // 如果没有 requestName 就默认添加一个不同的时间戳
    let requestName: number | string;
    // @ts-ignore
    if (method.toLocaleLowerCase() === "post") {
      if (config.data && qs.parse(config.data).cancel) {
        requestName = qs.parse(config.data).cancel;
      } else {
        requestName = new Date().getTime();
      }
    } else {
      if (config.params && config.params.cancel) {
        requestName = config.params.cancel;
      } else {
        requestName = new Date().getTime();
      }
    }
    // 判断，如果这里拿到的参数中的 requestName 在上一次请求中已经存在，就取消上一次的请求
    if (requestName) {
      // @ts-ignore
      if (axios[requestName] && axios[requestName].cancel) {
        // @ts-ignore
        axios[requestName].cancel();
      }

      conf.cancelToken = new CancelToken((c) => {
        // @ts-ignore
        axios[requestName] = {};
        // @ts-ignore
        axios[requestName].cancel = c;
      });
    }

    return conf;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return checkStatus(response);
  },
  (error) => {
    return Promise.reject(onError(error));
  }
);

export const extendConfig = (config: ExtendConfig): APIConfig => {
  let headers = { ...config.headers };

  if (config && config.token) {
    const authHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `${config.token}`
    };
    headers = { ...config.headers, ...authHeaders };
  } else {
    const accessToken = store.getters.accessToken || "";
    const authHeaders = {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `${accessToken}`
    };
    headers = { ...config.headers, ...authHeaders };
  }

  const _config = {
    baseURL: config && config.server ? config.server : process.env.VUE_APP_BASE_API,
    ...config,
    headers
  };

  return _config;
};

export default {
  getHttpInstance() {
    return instance;
  },
  /**
   *
   * @param options
   */
  request(options: AxiosRequestConfig) {
    return axios.request(options).then(checkStatus).then(onError);
  },
  /**
   * get方法，对应get请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   * @param {Object} config [请求时配置的HTTP相关参数]
   */
  async get({ url, params, config }: Get): Promise<any> {
    const _config = extendConfig(config);
    try {
      return await instance.get(url, { ..._config, params });
    } catch (error) {
      throw new Error(`HttpService ${error.message}`);
    }
  },

  /**
   * post方法，对应post请求
   * @param {String} url [请求的url地址]
   * @param {Object} payload [请求时携带的参数]
   * @param {Object} config [请求时配置的HTTP相关参数]
   */
  async post({ url, payload, config }: RestAPI): Promise<any> {
    try {
      const _config = extendConfig(config);
      return await instance.post(url, payload, _config);
    } catch (error) {
      throw new Error(`HttpService ${error.message}`);
    }
  },
  async patch({ url, payload, config }: RestAPI): Promise<any> {
    try {
      const _config = extendConfig(config);
      return await instance.patch(url, payload, _config);
    } catch (error) {
      throw new Error(`HttpService ${error.message}`);
    }
  },
  async put({ url, payload, config }: RestAPI): Promise<any> {
    try {
      const _config = extendConfig(config);
      return await instance.put(url, payload, _config);
    } catch (error) {
      throw new Error(`HttpService ${error.message}`);
    }
  },
  async delete({ url, payload, config }: RestAPI): Promise<any> {
    try {
      const _config = extendConfig(config);
      _config.data = payload;
      return await instance.delete(url, _config);
    } catch (error) {
      throw new Error(`HttpService ${error.message}`);
    }
  },
  async upload({ url, payload, config, callback }: RestAPI): Promise<any> {
    try {
      const _config = extendConfig(config);
      const _headers = _config.headers;
      let _conf = {
        ..._config,
        onUploadProgress: callback,
        headers: {
          ..._headers,
          "Content-Type": "multipart/form-data"
        }
      };
      return await instance.post(url, payload, _conf);
    } catch (error) {
      throw new Error(`HttpService ${error.message}`);
    }
  },
  async download({ url, payload, config, callback }: RestAPI): Promise<any> {
    try {
      const _config = extendConfig(config);
      let _conf = {
        ..._config,
        onDownloadProgress: callback,
        responseType: "blob"
      };
      return await instance.post(url, payload, _conf);
    } catch (error) {
      throw new Error(`HttpService ${error.message}`);
    }
  }
};
