import { notification } from 'antd';
import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { APP_API_URL } from '@/constants';

const CODE = {
  REQUEST_SUCCESS: 0,
  REQUEST_FOBID: -1,
};

// 默认错误处理方式
const onError = (error: AxiosResponse | any) => {
  // console.log('网络异常:', error);
  let errorMessage = error?.message ?? '未知异常';
  const response = error?.response;
  const status = error?.status ?? -1000;
  if (response) {
    switch (status) {
      case 400:
        errorMessage = '请求错误(400)';
        break;
      case 401:
        errorMessage = '未授权，请重新登录(401)';
        break;
      case 403:
        errorMessage = '拒绝访问(403)';
        break;
      case 404:
        errorMessage = '请求出错(404)';
        break;
      case 408:
        errorMessage = '请求超时(408)';
        break;
      case 500:
        errorMessage = '服务器内部错误(500)';
        break;
      case 501:
        errorMessage = '服务未实现(501)';
        break;
      case 502:
        errorMessage = '网络错误(502)';
        break;
      case 503:
        errorMessage = '服务不可用(503)';
        break;
      case 504:
        errorMessage = '网络超时(504)';
        break;
      case 505:
        errorMessage = 'HTTP版本不受支持(505)';
        break;
      default:
        errorMessage = `服务错误类型(${response.status ? response.status : '未知'})`;
    }
  } else {
    if (errorMessage.match(/network error/gi)) {
      errorMessage = '网络似乎出了点问题';
    }
    if (errorMessage.match('timeout')) {
      errorMessage = '数据接口请求超时';
    }

    if (errorMessage.includes('Request failed with status code')) {
      errorMessage = `数据接口${errorMessage.substr(errorMessage.length - 3)} 异常`;
    }
  }

  // 全局 Toast 提示
  if (error.message) {
    notification.error({
      message: '接口服务错误提示',
      description: error.message,
    });
  }

  return {
    code: status,
    message: `${errorMessage},请检查网络或联系管理员！`,
  };
};

// 处理网络请求带来的校验
const checkStatus = (response: AxiosResponse) => {
  // console.info("checkStatus:", response);

  // 自己定义code，连接错误的status
  const status = response?.status ?? CODE.REQUEST_FOBID;

  // 对 401 , 403 进行细节处理
  // 代码省略

  // 正常请求
  if ((status >= 200 && status < 300) || status === 304 || status === 400) {
    const { data } = response;
    if (data.code === CODE.REQUEST_SUCCESS) {
      return data;
    } else {
      return {
        code: data.code,
        message: data.msg,
      };
    }
  }

  return response;
};

const defaultConfig = {
  baseURL: APP_API_URL,
  timeout: 10000,
  withCredentials: true,
  validateStatus: (status: number) => {
    // 成功状态码范围
    return status >= 200 && status < 500;
  },
  headers: {
    // 设置默认请求头
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json, text/plain, */*',
    'Access-Control-Allow-Headers': 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin',
  },
};

// 创建一个单例
const instance: AxiosInstance = axios.create(defaultConfig);

instance.interceptors.request.use(
  (config: AxiosRequestConfig | any) => config,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return Promise.resolve(checkStatus(response));
  },
  (error) => {
    return Promise.reject(onError(error));
  }
);

export default {
  async request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return await instance.request(config);
  },

  async get(url: string, config?: AxiosRequestConfig): Promise<any> {
    return await instance.get(url, config);
  },

  async post(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return await instance.post(url, data, config);
  },

  async put(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return await instance.put(url, data, config);
  },

  async patch(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return await instance.patch(url, data, config);
  },

  async delete(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return await instance.delete(url, {
      data,
      ...config,
    });
  },
};
