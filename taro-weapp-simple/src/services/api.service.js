import Taro from '@tarojs/taro';
// import { stringify } from 'qs';
import API_CONFIG from './../config/api.config';
import AuthService from './auth.service'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

function checkStatus(response) {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response;
  }
  const errorText = codeMessage[response.statusCode] || response.statusText;

  const error = new Error(errorText);
  error.code = response.statusCode;
  error.json = response;
  throw error;
}

class ApiService {
  constructor() {
    this.store = null;
  }

  init(store) {
    this.store = store;
  }

  setAuth(res) {
    AuthService.set(res.header);
    return res;
  }

  /**
   * Requests a URL, returning a promise.
   */
  async request(url, options) {
    // const state = this.store.getState();

    const defaultOptions = {
      accept: 'application/json',
      header: AuthService.auth
    };
    const newOptions = { ...defaultOptions, ...options };
    if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
      newOptions.header = {
        'content-type': 'application/json',
        ...newOptions.header,
      };
      newOptions.data = JSON.stringify(newOptions.data);
    }

    console.log(url, newOptions);

    return await Taro.request({
      url,
      ...newOptions
    })
      .then(checkStatus)
      .then(response => {
        if (newOptions.method === 'DELETE' || response.statusCode === 204) {
          return response.text();
        }
        return response.json();
      })
      .then(this.setAuth)
      .catch(error => {
        if (error.response.statusCode === 401) {
          AuthService.logout();
        }
        throw error;
      });
  }

  // 用户登录
  async loginUser(params) {
    return await this.request(
      API_CONFIG.WEBAPP_API.ACTION_LOGIN_URL,
      {
        method: 'POST',
        data: {
          ...params,
        },
      }
    );
  }

  // 当前用户详情
  async getUser() {
    return await this.request(`${API_CONFIG.WEBAPP_API.ACTION_USER_INFO_URL}`);
  }

  // 资讯
  // async getNews() {
  //   const queryString = stringify({
  //     id: '10011',
  //     pageCount: 1,
  //   });
  //   const news = await this.request(`${API_CONFIG.WEBAPP_API.NEWS_LIST_URL}?${queryString}`);

  //   return news;
  // }
}

const getApi = () => {
  return new ApiService();
};

export { getApi }
export default new ApiService();
