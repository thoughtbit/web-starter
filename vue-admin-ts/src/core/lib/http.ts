import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { setup } from "axios-cache-adapter";
import { Message } from "element-ui";
import Storage from "@/utils/storage";
import { ERROR_NETWORK_DISCONNECTED, ERROR_SERVER_UNREACHABLE } from "@/constants";
import { AuthorizationHeaders, ExtendConfig, RestAPI, Get, APIConfig } from "@/types/http";
import { HeartUrl } from "./endpoints";

const cacheStore = Storage.createStorage("api-cache");

// 创建取消请求令牌
const CancelToken = axios.CancelToken;

const defaultConfig = {
  // 请求超时时间
  timeout: 2000,
  headers: {
    // 设置默认请求头
    "Access-Control-Allow-Origin": "*",
    "Accept": "application/json, text/plain, */*",
    "Access-Control-Allow-Headers": "Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin"
  }
};
const defaultCacheConfig: AxiosRequestConfig = {
  // `axios-cache-adapter` options
  cache: {
    store: cacheStore,
    // Cache expiration in milliseconds, here 15min
    maxAge: 15 * 60 * 1000,
    // Cache exclusion rules
    exclude: {
      // Store responses from requests with query parameters in cache
      query: false
    },
    key: (req) => {
      const serialized =
        req.params instanceof URLSearchParams ? req.params.toString() : JSON.stringify(req.params) || "";
      return req.url + serialized;
    }
  }
};

const api: AxiosInstance = setup({
  ...defaultConfig,
  ...defaultCacheConfig
});

const instance: AxiosInstance = axios.create(defaultConfig);

// 默认错误处理方式
// @ts-ignore
const onError = function(error) {
  if (error.message) {
    return true;
  }
  Message({
    showClose: true,
    message: error.message || "请求发生错误",
    type: "error",
    duration: 3 * 1000
  });
};

const checkStatus = async (res: AxiosResponse) => {
  if (res) {
    const token = await Storage.getAccessToken();
    // -1000 自己定义，连接错误的status
    const status = res.status || -1000;
    if ((res && status >= 200 && status < 300) || status === 304) {
      return res.data;
    } else {
      let message = "";
      switch (status) {
        case -1:
          message = "远程服务响应失败,请稍后重试";
          break;
        case 400:
          message = "400: 错误请求";
          break;
        case 401:
          // 401: 未登录
          // 未登录则跳转登录页面，并携带当前页面的路径
          // 在登录成功后返回当前页面，这一步需要在登录页操作。
          if (token){

          }
          message = "401: 访问令牌无效或已过期";
          break;
        case 403:
          // 403 Token过期
          // 登录过期对用户进行提示
          // 清除本地token和清空vuex中token对象
          // 跳转登录页面
          message = "403: 拒绝访问";
          break;
        case 404:
          message = "404：资源不存在";
          break;
        case 405:
          message = "405: 请求方法未允许";
          break;
        case 408:
          message = "408: 请求超时";
          break;
        case 500:
          message = "500：访问服务失败";
          break;
        case 501:
          message = "501：未实现";
          break;
        case 502:
          message = "502：无效网关";
          break;
        case 503:
          message = "503: 服务不可用";
          break;
        default:
          message = `连接错误${status}`;
      }

      onError(res);

      return {
        code: status,
        message
      };
    }
  }

  // 异常状态下，把错误信息返回去
  return {
    code: -404,
    message: "连接到服务器失败!"
  };
};

instance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const token = await Storage.getAccessToken();
    const conf = config;
    // 发起请求时，取消掉当前正在进行的相同请求
    const requestName = conf.data.requestName;
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

    if (token){
      config.headers["Authorization"] = token;
    }

    return conf;
  },
  (error) => {
    console.error("error:", error); // for debug
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return checkStatus(response);
  },
  (error) => {
    console.error("error:", error); // for debug
    return Promise.reject(checkStatus(error));
  }
);

const authorizationHeaders = (token: string) => {
  let headers: AuthorizationHeaders = {
    "Content-Type": "",
    "Authorization": ""
  };

  if (token) {
    headers = {
      "Content-Type": "application/json; charset=UTF-8",
      "Authorization": token
    };
  } else {
    const token = Storage.getAccessToken();
    if(token){
      headers = {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": `${token}`
      };
    }
  }
  return headers;
};

export const extendConfig = (config: ExtendConfig): APIConfig => {
  let headers = { ...config.headers };

  if (config && config.token) {
    const authHeaders = authorizationHeaders(config.token);
    headers = { ...config.headers, ...authHeaders };
  }

  let _config = {
    baseURL: config && config.server ? config.server : process.env.VUE_APP_API_PREFIX,
    ...config,
    headers
  };

  return _config;
};

export const checkIfServerOnline = async (): Promise<void> => {
  if (!navigator.onLine) throw new Error(ERROR_NETWORK_DISCONNECTED);

  try {
    // 请求心跳链接
    const response = await axios.get(HeartUrl);
    const serverIsResponding = response.status === 200;

    // 服务异常
    if (!serverIsResponding) throw new Error(ERROR_SERVER_UNREACHABLE);
  } catch (e) {
    const errorMessage = e && e.message ? e.message : "";
    // 网络连接异常
    if (errorMessage.match(/network error/gi)) {
      throw new Error(ERROR_SERVER_UNREACHABLE);
    } else {
      throw e;
    }
  }
};

export default {
  /**
   *
   * @param options
   */
  request(options: AxiosRequestConfig) {
    return axios.request(options).then(checkStatus);
  },
  /**
   * get方法，对应get请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   * @param {Object} config [请求时配置的HTTP相关参数]
   * @param {String} noCache [是否开启缓存]
   */
  async get({ url, params, config, noCache }: Get): Promise<any> {
    const _config = config ? extendConfig(config) : {};
    let res = null;
    try {
      if (noCache) {
        const _params = { noCache: Math.random(), ...params };
        res = await instance.get(url, { ..._config, params: _params });
      } else {
        res = await api.get(url, { ..._config, params });
      }
      return res;
    } catch (error) {
      await checkIfServerOnline();
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
      throw new Error(`HttpService ${error}`);
    }
  },
  async patch({ url, payload, config }: RestAPI): Promise<any> {
    try {
      const _config = extendConfig(config);
      return await instance.patch(url, payload, _config);
    } catch (error) {
      throw new Error(`HttpService ${error}`);
    }
  },
  async put({ url, payload, config }: RestAPI): Promise<any> {
    try {
      const _config = extendConfig(config);
      return await instance.put(url, payload, _config);
    } catch (error) {
      throw new Error(`HttpService ${error}`);
    }
  },
  async delete({ url, payload, config }: RestAPI): Promise<any> {
    try {
      const _config = extendConfig(config);
      _config.data = payload;
      return await instance.delete(url, _config);
    } catch (error) {
      throw new Error(`HttpService ${error}`);
    }
  },
  async upload({ url, payload, config }: RestAPI): Promise<any> {
    try {
      const _config = extendConfig(config);
      const _headers = _config.headers;
      let _conf = {
        ..._config,
        headers: {
          ..._headers,
          "Content-Type": "multipart/form-data"
        }
      };
      return await instance.post(url, payload, _conf);
    } catch (error) {
      throw new Error(`HttpService ${error}`);
    }
  },
  async download({ url, payload, config }: RestAPI): Promise<any> {
    try {
      const _config = extendConfig(config);
      let _conf = {
        ..._config,
        responseType: "blob"
      };
      return await instance.post(url, payload, _conf);
    } catch (error) {
      throw new Error(`HttpService ${error}`);
    }
  }
};
