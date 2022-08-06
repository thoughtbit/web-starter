import { Layout } from "@/layouts";
import type { RouteRecordRaw } from "vue-router";

const dashboardRouter: RouteRecordRaw = {
  path: "/",
  name: "home",
  component: Layout,
  redirect: { name: "dashboard" },
  meta: {
    title: "首页",
    requiresAuth: true,
  },
  children: [
    {
      path: "dashboard",
      name: "dashboard",
      component: () => import("@/pages/dashboard/index.vue"),
      meta: {
        title: "控制台",
        icon: "gongzuotai",
        requiresAuth: true,
        roles: ["*"],
      },
    },
  ],
};

export default dashboardRouter;
