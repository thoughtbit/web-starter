import APP_CONFIG from './app.config';

const BASE_URL = APP_CONFIG.BASE_URL;

export default {
  BASE_URL,
  // 第三方接口
  OPEN_API: {

  },

  // WebSocket
  "WEB_SOCKET_URL": "ws://localhost:4000",

  // 应用接口
  APP_BASE_API: {
    ACTION_LOGIN_URL: `${BASE_URL}/user/login`,
    ACTION_USERS_URL: `${BASE_URL}/users`,
    ACTION_USER_INFO_URL: `${BASE_URL}/user`
  }


}
