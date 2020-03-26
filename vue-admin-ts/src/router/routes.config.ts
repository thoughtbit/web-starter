// @ts-nocheck
import { RouteConfig } from "vue-router";

export type RoutesConfig = { [key: string]: RouteConfig };

// 正式路由配置
export const routesConfig = Object.freeze<RoutesConfig>({
  // 登录
  login: {
    path: "/login",
    name: "Login",
    hidden: true
  },
  // 主框架
  index: {
    path: "/",
    name: "Index",
    hidden: true
  },
  // 异常
  unauthorized: {
    name: "Unauthorized",
    path: "/401",
    hidden: true
  },
  notFound: {
    name: "NotFound",
    path: "*",
    hidden: true
  },
  error: {
    name: "Error",
    path: "/error",
    hidden: true
  }
});


export const routesMap = {
  // 登录
  login: "views/containers/login",

  // 主框架
  index: "views/layouts/menu-view",

  // 异常
  error: "views/containers/error",
  notFound: "views/containers/404",
  unauthorized: "views/containers/401"
};
