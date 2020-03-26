// @ts-nocheck
import { RouteConfig } from "vue-router";

export type RoutesConfig = { [key: string]: RouteConfig };

// 正式路由配置
export const routesConfig = Object.freeze<RoutesConfig>({
  // 登录
  login: {
    path: "/login",
    name: "login",
    hidden: true
  },
  // 主框架
  index: {
    path: "/",
    name: "index",
    hidden: true
  },
  // 异常
  unauthorized: {
    name: "unauthorized",
    path: "/401",
    hidden: true
  },
  notFound: {
    name: "notFound",
    path: "*",
    hidden: true
  },
  error: {
    name: "error",
    path: "/error",
    hidden: true
  },

  about: {
    name: "about",
    path: "/about",
    hidden: true
  },

  dashboard: {
    name: "dashboard",
    path: "/dashboard",
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
  unauthorized: "views/containers/401",

  // 其它
  about: "views/containers/about",

  dashboard: "views/containers/dashboard"
};
