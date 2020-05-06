import { EndpointOptions } from "@/types/http";

// 心跳链接
export const HeartUrl = "/health";

// 全局API配置
export const AppEndpoints = {
  // 搜集日志
  sendLogs: {
    method: "GET",
    endpoint: "/send_logs"
  }
};

//权限API配置
export const PermissionEndpoints = {
  // 菜单及权限标识列表
  getMenusPermission: {
    method: "GET",
    endpoint: "/menus"
  },
}

// 用户API配置
export const UserEndpoints: EndpointOptions = {
  // 用户登录
  login: {
    method: "POST",
    endpoint: "/login"
  },
  // 退出登录
  logout: {
    method: "POST",
    endpoint: "/logout"
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
  // 验证码
  getCaptcha:{
    method: "GET",
    endpoint: "/kaptcha"
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
  ...UserEndpoints,
  ...PermissionEndpoints
};
