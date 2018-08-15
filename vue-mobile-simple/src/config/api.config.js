import APP_CONFIG from './app.config';

const BASE_URL = APP_CONFIG.BASE_URL;

export default {
  BASE_URL,
  /**
   * 登陆属性
   */
  LOGIN_API: {
    ACTION_URL: `${BASE_URL}user/login`,
    ACTION_RE_URL: `${BASE_URL}user/relogin`,
  },
};
