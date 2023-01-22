import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";
import { Toast } from "antd-mobile";
import { APP_API_URL, MODE } from "@/constants";

export type HttpMethod = "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT";

const env = MODE || "development";

const API_HOST: any = env === "mock" ? "/" : APP_API_URL; // 如果是mock模式 就不配置host 会走本地Mock拦截

// 状态码
const ERROR_CODE: Record<any, string> = {
  200: "服务器成功返回请求的数据(200)",
  201: "新建或修改数据成功(201)",
  202: "一个请求已经进入后台排队（异步任务）(202)",
  204: "删除数据成功(204)",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作(400)",
  401: "未授权，请重新登录(401)",
  403: "拒绝访问(403)",
  404: "访问资源不存在(404)",
  406: "请求的格式不可得(406)",
  408: "请求请求超时(408)",
  410: "请求的资源被永久删除，且不会再得到的(410)",
  422: "当创建一个对象时，发生一个验证错误(422)",
  500: "服务器发生错误，请检查服务器(500)",
  501: "服务未实现(501)",
  502: "网络错误(502)",
  503: "服务不可用(503)",
  504: "网络超时(504)",
  505: "HTTP版本不受支持(505)",
  1000: "系统未知错误，请反馈给管理员",
};

const CODE = {
  REQUEST_SUCCESS: 0,
  REQUEST_FORBID: -1,
};

// 请求重试
// get("/users"); // 请求失败不重试
// get("/users", { retry: 3 }); // 请求失败, 重试3次
const retryAdapterEnhancer = (adapter: any, options: any) => {
  const { retry = 0, delay = 1 } = options;

  return async (config: any) => {
    const { retryTimes = retry, retryDelay = delay } = config;
    let __retryCount = 0;
    const request: any = async () => {
      try {
        return await adapter(config);
      } catch (err) {
        if (!retryTimes || __retryCount >= retryTimes) {
          return Promise.reject(err);
        }
        __retryCount++;
        // 延时处理
        const delay = new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, retryDelay);
        });
        // 重新发起请求
        return delay.then(() => {
          return request();
        });
      }
    };
    return request();
  };
};

// 默认错误处理方式
const errorHandler = (error: AxiosResponse) => {
  console.log("errorHandler:", error);

  const { status, statusText } = error;
  // 自己定义code，连接错误的status
  const code = status ?? CODE.REQUEST_FORBID;

  let errorMessage = ERROR_CODE[code] || statusText || ERROR_CODE[1000];

  if (errorMessage === "Network Error") {
    errorMessage = "数据服务连接异常";
  } else if (errorMessage.includes("timeout")) {
    errorMessage = "数据服务请求超时";
  } else if (errorMessage.includes("Request failed with status code")) {
    errorMessage = "数据服务" + errorMessage.substr(errorMessage.length - 3) + "异常";
  }

  Toast.show({
    icon: "fail",
    content: errorMessage,
  });
};

// 处理网络请求带来的校验
const checkStatus = (response: AxiosResponse) => {
  console.log("checkStatus:", response);
  // 自己定义code，连接错误的status
  const code = response?.status ?? CODE.REQUEST_FORBID;

  // 判断请求是否成功
  const isSuccess = () => {
    return (code >= 200 && code < 300) || code === 304 || code === 400;
  };

  // 成功
  if (isSuccess()) {
    const { data } = response;
    // 接口服务状态
    if (data.code === CODE.REQUEST_SUCCESS) {
      return data;
    } else {
      Toast.show({
        icon: "fail",
        content: ERROR_CODE[data.code] || data.msg || ERROR_CODE[1000],
      });

      return {
        code: data.code,
        msg: ERROR_CODE[data.code] || data.msg || ERROR_CODE[1000],
      };
    }
  }

  return response;
};

const defaultConfig = {
  baseURL: API_HOST,
  timeout: 10000,
  withCredentials: true,
  // 适配器, 请求重试
  adapter: retryAdapterEnhancer(axios.defaults.adapter, {
    retry: 2,
    delay: 300,
  }),
  validateStatus: (status: number) => {
    // 成功状态码范围
    return status >= 200 && status < 500;
  },
  headers: {
    // 设置默认请求头
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json, text/plain, */*",
    "Access-Control-Allow-Headers": "Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin",
  },
};

// 您可以使用自定义配置新建一个实例
const instance: AxiosInstance = axios.create(defaultConfig);

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => config,
  (error: any) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return Promise.resolve(checkStatus(response));
  },
  (error) => {
    return Promise.reject(errorHandler(error));
  }
);

export const cancelTokenSource: CancelTokenSource = axios.CancelToken.source();

export const request = (config: AxiosRequestConfig) => instance.request(config);
export const get = (url: string, config?: AxiosRequestConfig) => instance.get(url, config);
export const post = (url: string, data?: any, config?: AxiosRequestConfig) => instance.post(url, data, config);
export const put = (url: string, data?: any, config?: AxiosRequestConfig) => instance.put(url, data, config);
export const patch = (url: string, data?: any, config?: AxiosRequestConfig) => instance.patch(url, data, config);
export const download = (url: string, data?: any, config?: AxiosRequestConfig) =>
  instance.post(url, data, {
    responseType: "blob",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    ...config,
  });

export const upload = (url: string, formData?: any, config?: AxiosRequestConfig) =>
  instance.post(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    ...config,
  });

export default instance;
