import qs from 'qs'
import Request from './request'
import { DefaultBaseUrl, DefaultHeaders } from '@/constants'

const request = new Request({
  baseURL: DefaultBaseUrl,
  timeout: 1000 * 60 * 4,
  withCredentials: false,
  paramsSerializer: (params: any) => {
    const query = qs.stringify(
      Object.fromEntries(
        Object.entries(params).filter(
          ([, v]) => !['undefined', 'null', undefined, null].includes((v as any)?.toString() ?? v),
        ),
      ),
    )

    return query
  },
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config: IAxiosRequestConfig) => {
      config.headers = {
        ...DefaultHeaders,
        ...config.headers,
      }
      return config
    },
    // 响应拦截器
    responseInterceptors: (result: IAxiosResponse) => {
      return result
    },
  },
})

export default request
