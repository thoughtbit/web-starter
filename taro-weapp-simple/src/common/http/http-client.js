/**
 * HTTP Clinet (Taro.request)
 */
import Taro from '@tarojs/taro';

const codeMessage = {
  200: '服务器成功返回请求的数据(200)',
  201: '新建或修改数据成功(201)',
  202: '一个请求已经进入后台排队（异步任务）(202)',
  204: '删除数据成功(204)',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作(400)',
  401: '用户没有权限（令牌、用户名、密码错误）(401)',
  403: '用户得到授权，但是访问是被禁止的(403)',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作(404)',
  406: '请求的格式不可得(406)',
  408: '请求请求超时(408)',
  410: '请求的资源被永久删除，且不会再得到的(410)',
  422: '当创建一个对象时，发生一个验证错误(422)',
  500: '服务器发生错误，请检查服务器(500)',
  501: '服务器尚未实施(501)',
  502: '网络错误(502)',
  503: '服务不可用(503)',
  504: '网络超时(504)',
  505: 'HTTP版本不受支持(505)',
};

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

function checkStatus(response) {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response;
  }
  const errorText = codeMessage[response.statusCode] || response.statusText;

  const error = new Error(errorText);
  error.code = response.statusCode;
  error.data = response.data;
  throw error;
}

class HttpClient {
  /**
   * Create a new instance of HttpClient.
   */
  constructor() {
    this.interceptors = {
      request: [],
      response: [],
    };
  }

  /**
   * Sends a single request to server.
   */
  async request(url, options) {
    // 判断Query String 参数值是否太大
    assertLongQuery(url);

    const defaultOptions = {
      timeout: 30 * 1000
    };

    const { method } = options;
    let requestUrl = url;
    let headers = options.header || {};
    let requestOptions = {
      ...defaultOptions, 
      ...options,
      method: method ? method.toUpperCase() : 'GET'
    };

    // 设置默认 Accept 和 Content-Type
    requestOptions.header = Object.assign({
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json; charset=utf-8',
    }, headers);

    this.interceptors.request.forEach((interceptor) => {
      const request = interceptor(requestUrl, requestOptions);
      requestUrl = request.url;
      requestOptions = request.options;
    });

    const fetchPromise = Taro.request({
      url,
      ...requestOptions
    })
      .then(checkStatus)
      .then((res) => {
        const { data } = res;
        // 直接返回成功数据
        return Promise.resolve(data);
      }).catch((err) => {
        const { data } = err;
        if(!data) {
          return Promise.reject({
            code: '10001',
            data: null,
            message: '服务器异常'
          });
        }
        return Promise.reject(data);
      });

    let response = this.timeoutPromise(fetchPromise, requestOptions.timeout);

    this.interceptors.response.forEach((interceptor) => {
      response = interceptor(response);
    });

    return response;
  }

  /**
   * 超时
   * @param fetchPromise
   * @param timeout
   * @returns {Promise<any>}
   */
  timeoutPromise(fetchPromise, timeout) {
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

  async delete (url, config = {}) {
    return await this.request(url, Object.assign(config, { method: 'DELETE' }))
  }
  async get (url, config = {}) {
    return await this.request(url, Object.assign(config, { method: 'GET' }))
  }
  async head (url, config = {}) {
    return await this.request(url, Object.assign(config, { method: 'HEAD' }))
  }
  async options (url, config = {}) {
    return await this.request(url, Object.assign(config, { method: 'OPTIONS' }))
  }
  async post (url, data, config = {}) {
    return await this.request(url, Object.assign(config, { method: 'POST', data }))
  }
  async put (url, data, config = {}) {
    return await this.request(url, Object.assign(config, { method: 'PUT', data }))
  }
  async patch (url, data, config = {}) {
    return await this.request(url, Object.assign(config, { method: 'PATCH', data }))
  }
  async upload(url, data, config = {}) {
    return await this.request(url, Object.assign(config, { method: 'POST', header: { 'Content-Type': 'multipart/form-data' }, data }))
  }
}

export default HttpClient;
