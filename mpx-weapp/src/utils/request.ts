import mpx from '@mpxjs/core';
import mpxFetch, { CancelToken } from '@mpxjs/fetch';
import type { fetchOption } from '@mpxjs/fetch';

import storage, { TOKEN_KEY } from './storage';

mpx.use(mpxFetch);

// 状态码
const errorCode: Record<any, string> = {
  200: '服务器成功返回请求的数据(200)',
  201: '新建或修改数据成功(201)',
  202: '一个请求已经进入后台排队（异步任务）(202)',
  204: '删除数据成功(204)',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作(400)',
  401: '未授权，请重新登录(401)',
  403: '拒绝访问(403)',
  404: '访问资源不存在(404)',
  406: '请求的格式不可得(406)',
  408: '请求请求超时(408)',
  410: '请求的资源被永久删除，且不会再得到的(410)',
  422: '当创建一个对象时，发生一个验证错误(422)',
  500: '服务器发生错误，请检查服务器(500)',
  501: '服务未实现(501)',
  502: '网络错误(502)',
  503: '服务不可用(503)',
  504: '网络超时(504)',
  505: 'HTTP版本不受支持(505)',
  1000: '系统未知错误，请反馈给管理员',
};

const CODE = {
  REQUEST_SUCCESS: 0,
  REQUEST_FORBID: -1,
};

// 默认错误处理方式
const errorHandler = (error: any) => {
  console.log('网络异常:', error);

  const { statusCode, errMsg } = error;
  // 自己定义code，连接错误的status
  const code = statusCode ?? CODE.REQUEST_FORBID;

  let errorMessage = errorCode[code] || errMsg || errorCode[1000];

  if (errorMessage === 'Network Error') {
    errorMessage = '数据服务连接异常';
  } else if (errorMessage.includes('timeout')) {
    errorMessage = '数据服务请求超时';
  } else if (errorMessage.includes('Request failed with status code')) {
    errorMessage = '数据服务' + errorMessage.substr(errorMessage.length - 3) + '异常';
  }

  mpx.showToast({
    title: errorMessage,
    icon: 'none',
  });

  return error;
};

// 处理网络请求带来的校验
const checkStatus = (response: any) => {
  console.log('response:', response);
  // 自己定义code，连接错误的status
  const code = response?.statusCode ?? CODE.REQUEST_FORBID;

  if (code === 401) {
    mpx.showToast({
      title: '登录状态已过期, 重新登录',
      icon: 'none',
    });
    storage.remove(TOKEN_KEY);
  } else if (code === 403) {
    mpx.showToast({
      title: '用户未登录, 请登录',
      icon: 'none',
    });
    storage.remove(TOKEN_KEY);
  }

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
      mpx.showToast({
        title: errorCode[data.code] || data.msg || errorCode[1000],
        icon: 'none',
      });
      return {
        code: data.code,
        msg: errorCode[data.code] || data.msg || errorCode[1000],
      };
    }
  }

  return response;
};

mpx.xfetch.interceptors.request.use(
  (config) => {
    console.log('request:', config);

    const accessToken = storage.get(TOKEN_KEY);

    config.timeout = 10000;
    config.headers = {
      // 设置默认请求头
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json, text/plain, */*',
      'Access-Control-Allow-Headers': 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    };

    Promise.resolve(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

mpx.xfetch.interceptors.response.use(
  (response) => {
    return Promise.resolve(checkStatus(response));
  },
  (error) => {
    return Promise.reject(errorHandler(error));
  }
);

export const cancelToken = new CancelToken();

export type AnyObj = {
  [key: string]: unknown;
};

export type HttpMethod = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';

/**
 * 微信请求
 * method
 * url
 * data 以对象的格式传入
 */
export function request(
  url: string,
  method: HttpMethod,
  data: AnyObj = {},
  options: fetchOption | any = {}
): Promise<any> {
  const defaultOptions = {
    url,
    method,
    data,
  };

  return mpx.xfetch.fetch(Object.assign(defaultOptions, options));
}

/**
 * get请求方法
 * url
 * data 以对象的格式传入
 */
export function get(url: string, data = {}, options = {}): Promise<any> {
  return request(url, 'GET', data, options);
}

/**
 * post请求方法封装
 * url
 * data 以对象的格式传入
 */
export function post(url: string, data = {}, options = {}): Promise<any> {
  return request(url, 'POST', data, options);
}
