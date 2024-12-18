import pkg from '@/../package.json'

export { default as pkg } from '@/../package.json'

// 请求
/** 默认请求基地址 */
export const DefaultBaseUrl
  = import.meta.env.VITE_BASE_API
/** 默认请求头 */
export const DefaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Version': `${pkg.name}/${pkg.version}`,
}
