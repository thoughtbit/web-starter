export default {
  BASE_URL: 'https://easy-mock.com/mock/5b74e4425ec4891242bc64c7/api',
  // 第三方接口
  OPEN_API: {
  },
  // WebSocket
  "WEB_SOCKET_URL": "ws://localhost:4000",
  // 应用接口
  APP_BASE_API: {
    LOGIN_URL: `${this.BASE_URL}/auth/login`,
    VALIDATE_TOKEN_URL: `${this.BASE_URL}/auth/validate_token`,
    SIGNUP_URL: `${this.BASE_URL}/auth/signup`,
    USER_INFO_URL: `${this.BASE_URL}/user`,
    USERS_URL: `${this.BASE_URL}/users`
  }
}
