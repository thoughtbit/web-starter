import { createWebHashHistory, createWebHistory } from "vue-router";
import type { RouterOptions, RouteRecordRaw, RouteRecordNormalized } from "vue-router";
import { PageView } from "@/layouts";
import { DEBUG, APP_BASE_URL } from "@/constants";
import { formatModules } from "@/utils";

const modules = import.meta.globEager("./modules/*.ts");
const appRoutes: RouteRecordNormalized[] = formatModules(modules, []);

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login/index.vue"),
    meta: {
      title: "登录",
      requiresAuth: false,
    },
  },
  ...appRoutes,

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

      {
        path: "v-memo",
        name: "v-memo",
        component: () => import("@/pages/features/v-memo.vue"),
        meta: {
          title: "v-memo 渲染视图缓存",
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
    meta: {
      title: "找不到页面",
      requiresAuth: false,
    },
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

export { routes, routerConfig };
