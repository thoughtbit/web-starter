// 心跳链接
export const HeartUrl = `${process.env.VUE_APP_API_PREFIX}/version`;

// 全局API配置
export const AppEndpoints = {
  // 搜集日志
  sendLogs: {
    method: "GET",
    endpoint: "/send_logs"
  }
};

// 用户API配置
export const UserEndpoints = {
  // 用户登录
  login: {
    method: "GET",
    endpoint: "/login"
  },
  // 找回密码
  findPassword: {
    method: "POST",
    endpoint: "/find_pwd"
  },
  // 修改密码
  modifyPassword: {
    method: "PUT",
    endpoint: "/modify_pwd"
  },
  // 用户注册
  signup: {
    method: "POST",
    endpoint: "/signup"
  },
  // 查询用户
  getUser: {
    method: "GET",
    endpoint: "/user"
  },

  /**
   * 用户列表管理服务
   */
  getUsers: {
    method: "GET",
    endpoint: "/users"
  },
  createUser: {
    method: "POST",
    endpoint: "/user"
  },
  updateUser: {
    method: "PUT",
    endpoint: "/user"
  },
  destroyUser: {
    method: "DELETE",
    endpoint: "/user"
  }
};

/**
 *  默认导全部API配置
 */
export default {
  ...AppEndpoints,
  ...UserEndpoints
};
