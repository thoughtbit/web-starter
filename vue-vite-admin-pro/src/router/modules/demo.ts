import { PageView } from "@/layouts";
import type { RouteRecordRaw } from "vue-router";

const demoRouter: RouteRecordRaw = {
  path: "/demo",
  name: "demo",
  component: PageView,
  redirect: { name: "index" },
  children: [
    {
      path: "index",
      name: "index",
      component: () => import("@/pages/demo/index.vue"),
      meta: {
        title: "演示",
        icon: "icon-demo",
        requiresAuth: false,
      },
    },
    {
      path: "case",
      name: "case",
      component: () => import("@/pages/demo/hello/Case"),
      meta: {
        title: "演示",
        icon: "icon-demo",
        requiresAuth: false,
      },
    },
    {
      path: "frame",
      name: "frame",
      component: () => import("@/pages/demo/frame.vue"),
      meta: {
        title: "演示",
        icon: "icon-demo",
        requiresAuth: false,
        link: "http://vue-pro.arco.design/dashboard/workplace",
      },
    },
  ],
};

export default demoRouter;
