const MODE = process.env.NODE_ENV;
const DEBUG = !['staging', 'production'].includes(MODE ?? '');

// 接口服务地址
const APP_BASE_URL = 'https://api.moocss.com/mock/603';

// 用户登录服务
const LOGIN_URL = `${APP_BASE_URL}/wxlogin`;

export { MODE, DEBUG, APP_BASE_URL, LOGIN_URL };
