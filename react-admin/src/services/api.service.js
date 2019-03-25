import "whatwg-fetch";
// import { stringify } from 'qs';
import AuthService from './auth.service';
import API_CONFIG from './../config/api.config';

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

/**
 * Max Query String
 */
function assertLongQuery(url) {
  const [, ...queryParts] = url.split('?');
  const query = queryParts.join('');
  if (query.length > 2048) {
    console.error(`Query length (${query.length}) is longer than ${2048}. This doesn't work on some servers [${url}]`);
  }
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
   *
   * @param  {string} url       The URL we want to request
   * @param  {object} [options] The options we want to pass to "fetch"
   * @return {object}           An object containing either "data" or "err"
   */
  async request(url, options, isInternal = true) {
    // 判断Query String 参数值是否太大
    assertLongQuery(url);

    const defaultOptions = {
      timeout: 20 * 1000,
      credentials: 'include', // 是否可以将对请求的响应暴露给页面, Credentials可以是 cookies, authorization headers 或 TLS client certificates.
    };
    const newOptions = { ...defaultOptions, ...options };
    newOptions.headers = {
      'Accept': 'application/json, text/plain, */*',
    };
    if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
      if (!(newOptions.body instanceof FormData)) {
        newOptions.headers = {
          'Content-Type': 'application/json; charset=utf-8',
          ...newOptions.headers,
        };
        newOptions.body = JSON.stringify(newOptions.body);
      } else {
        // newOptions.body is FormData
        newOptions.headers = {
          'Content-Type': 'multipart/form-data',
          ...newOptions.headers,
        };
      }
    }

    if (isInternal) {
      newOptions.headers = {
        'token': this.store.token,
        ...newOptions.headers,
      };
    }

    console.log(url, newOptions);
    const fetchPromise = new Promise((resolve, reject) => {
      fetch(url, newOptions)
        .then(checkStatus)
        .then((response) => {
          if (newOptions.method === 'DELETE' || response.status === 204) {
            return response.text();
          }
          return response.json();
        })
        .then(this.setAuth)
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });

    return this.timeoutPromise(fetchPromise, newOptions.timeout);
  }

  /**
   * 超时
   * @param fetchPromise
   * @param timeout
   * @returns {Promise<any>}
   */
  timeoutPromise = (fetchPromise, timeout) => {
    let abortFn = null;

    // 这是一个可以被reject的promise
    const abortPromise = new Promise((resolve, reject) => {
      abortFn = () => {
        reject(new Error({ status: 504 }));
      };
    });

    // 这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
    const racePromise = Promise.race([fetchPromise, abortPromise]);

    setTimeout(() => {
      abortFn();
    }, timeout);

    return racePromise;
  }

  /**
   * 用户相关接口
   */

  // 用户登录
  async login(params) {
    const url = API_CONFIG.APP_BASE_API.LOGIN_URL;
    return await this.request(
      url,
      {
        method: 'POST',
        data: {
          ...params
        },
      }
    );
  }

  // 当前用户详情
  async getUser() {
    const url = API_CONFIG.APP_BASE_API.USER_INFO_URL;
    return await this.request(url);
  }

  // 用户注册
  async signup(params) {
    const url = API_CONFIG.APP_BASE_API.SIGNUP_URL;
    return await this.request(url, {
      method: 'POST',
      data: {
        ...params
      }
    });
  }

  // 获取所有用户
  async getUsers() {
    const url = API_CONFIG.APP_BASE_API.USERS_URL;
    return await this.request(url);
  }

  // 根据用户ID获取用户
  async getUsersById(id) {
    const url = `${API_CONFIG.APP_BASE_API.USERS_URL}/${id}`;
    return await this.request(url);
  }

  // 资讯
  // async getNews() {
  //   const queryString = stringify({
  //     id: '10011',
  //     pageCount: 1,
  //   });
  //   const news = await this.request(`${}?${queryString}`);

  //   return news;
  // }
}

const getApi = () => {
  return new ApiService();
};

export { getApi }
export default new ApiService();
