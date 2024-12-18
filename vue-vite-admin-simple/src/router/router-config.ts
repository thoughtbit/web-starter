import { createWebHistory } from "vue-router";
import type { RouteRecordRaw, RouterOptions } from "vue-router";
import { APP_BASE_URL } from "@/constants";
import { Layout as LAYOUT } from "./constants";
import { mapModuleRouterList } from "./router-utils";

// 导入homepage相关固定路由
const homepageModules = import.meta.glob("./modules/**/home.ts", { eager: true });
// 导入modules非homepage相关固定路由
const fixedModules = import.meta.glob("./modules/**/!(home).ts", { eager: true });


const defaultRouterList: Array<RouteRecordRaw> = [
  {
    path: "/redirect",
    name: "Redirect",
    component: LAYOUT,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/pages/redirect/index.vue"),
      },
    ],
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   component: () => import("@/pages/login/index.vue"),
  //   meta: {
  //     title: "登录",
  //     requiresAuth: false,
  //     ignoreCache: true,
  //   },
  // },
  {
    path: "/:pathMatch(.*)*",
    name: "404Page",
    component: () => import("@/pages/result/404.vue"),
    meta: {
      title: "找不到页面",
      requiresAuth: false,
      ignoreCache: true,
    },
  },
  {
    path: "/403",
    name: "403Page",
    component: () => import("@/pages/result/403.vue"),
    meta: {
      title: "没有权限",
      requiresAuth: false,
      ignoreCache: true,
    },
  },
];

// 存放固定路由
export const homeRouterList: Array<RouteRecordRaw> = mapModuleRouterList(homepageModules);
export const fixedRouterList: Array<RouteRecordRaw> = mapModuleRouterList(fixedModules);
export const allRoutes = [...homeRouterList, ...fixedRouterList, ...defaultRouterList];

const routerConfig: RouterOptions = {
  history: createWebHistory(APP_BASE_URL),
  routes: allRoutes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    };
  },
};

export { routerConfig };
