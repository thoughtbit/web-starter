import type { App } from "vue";
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import type { RouterOptions, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { DEBUG, APP_BASE_URL } from "@/constants";
import { PageView } from "@/layouts";
import { createRouteGuard } from "./guard";

NProgress.configure({
  showSpinner: false,
});

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/home/index.vue"),
    meta: {
      title: "首页",
      requiresAuth: false,
    },
  },
  {
    path: "/demo",
    name: "demo",
    component: PageView,
    redirect: { name: "index" },
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("@/pages/demo/demo.vue"),
        meta: {
          title: "演示",
          icon: "icon-demo",
          display: "all",
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: "/:path(.*)*",
    name: "404",
    component: () => import("@/pages/result/404.vue"),
  },
];

const routerConfig: RouterOptions = {
  history: createWebHistory(APP_BASE_URL),
  routes,
  scrollBehavior() {
    return {
      el: "#app",
      top: 0,
      behavior: "smooth",
    };
  },
};

if (!DEBUG) {
  routerConfig.history = createWebHashHistory(APP_BASE_URL);
}

const router = createRouter(routerConfig);

// 全局前置守卫
router.beforeEach((to: any, from: any, next: any) => {
  NProgress.start();
  next();
});

// 全局后置守卫
router.afterEach(() => {
  NProgress.done();
});

createRouteGuard(router);

export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
