import AppConfig from './app.config';

const { BASE_URL } = AppConfig;

export default {
  BASE_URL,
  // WebSocket
  WEB_SOCKET_URL: 'ws://113.200.212.16:2048',

  // 第三方接口
  OPEN_API: {
  },

  // 应用接口
  APP_BASE_API: {
		LOGIN_URL: `${BASE_URL}/login`,
    FIND_PASSWORD_URL: `${BASE_URL}/find_pwd`,
    MODIFY_PASSWORD_URL: `${BASE_URL}/modify_pwd`,
    VALIDATE_TOKEN_URL: `${BASE_URL}/validate_token`,
    SIGNUP_URL: `${BASE_URL}/signup`,
    USER_INFO_URL: `${BASE_URL}/user`,
    USERS_URL: `${BASE_URL}/users`,

    FEEDS_URL: 'https://easy-mock.com/mock/5b21d97f6b88957fa8a502f2/example/feed'
  },
};
