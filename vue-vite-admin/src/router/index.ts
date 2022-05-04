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
        component: () => import("@/pages/demo/index"),
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
    path: "/todo",
    name: "todo",
    component: () => import("@/pages/todo/index.vue"),
    meta: {
      title: "Todo例子",
      requiresAuth: false,
    },
  },
  {
    path: "/features",
    name: "features",
    component: PageView,
    redirect: { name: "index" },
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("@/pages/features/index.vue"),
        meta: {
          title: "新特征和高级用法",
          icon: "icon-demo",
          display: "all",
          requiresAuth: false,
        },
      },
      {
        path: "player",
        name: "player",
        component: () => import("@/pages/features/teleport-player.vue"),
        meta: {
          title: "Teleport 悬浮视频播放器",
          icon: "icon-demo",
          display: "all",
          requiresAuth: false,
        },
      },
      {
        path: "async-component",
        name: "async-component",
        component: () => import("@/pages/features/async-component.vue"),
        meta: {
          title: "defineAsyncComponent 异步组件按需加载",
          icon: "icon-demo",
          display: "all",
          requiresAuth: false,
        },
      },
      {
        path: "dynamic-component",
        name: "dynamic-component",
        component: () => import("@/pages/features/dynamic-component.vue"),
        meta: {
          title: "defineAsyncComponent 动态组件加载",
          icon: "icon-demo",
          display: "all",
          requiresAuth: false,
        },
      },

      {
        path: "suspense",
        name: "suspense",
        component: () => import("@/pages/features/suspense-skeleton.vue"),
        meta: {
          title: "Suspense 实现骨架屏加载",
          icon: "icon-demo",
          display: "all",
          requiresAuth: false,
        },
      },
      {
        path: "custom-ref",
        name: "custom-ref",
        component: () => import("@/pages/features/custom-ref.vue"),
        meta: {
          title: "customRef 实现敏感词替换",
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
