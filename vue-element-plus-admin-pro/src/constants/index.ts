/**
 * 请求成功状态码
 */
export const SUCCESS_CODE = 0

/**
 * 请求contentType
 */
export const CONTENT_TYPE = 'application/json'

/**
 * 请求超时时间
 */
export const REQUEST_TIMEOUT = 60000

/**
 * 不重定向白名单
 */
export const NO_REDIRECT_WHITE_LIST = ['/login']

/**
 * 不重置路由白名单
 */
export const NO_RESET_WHITE_LIST = ['Redirect', 'Login', 'NoFind', 'Root']
