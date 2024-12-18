import { Layout } from "@/router/constants";
import type { RouteRecordRaw } from "vue-router";

const homeRouter: RouteRecordRaw[] = [{
  path: "",
  name: "Home",
  component: Layout,
  redirect: "/index",
  meta: {
    icon: "home",
    title: "首页",
    requiresAuth: true,
    ignoreCache: false,
  },
  children: [
    {
      path: "index",
      component: () => import("@/pages/home/index.vue"),
      name: "Index",
      meta: {
        title: "首页",
        icon: "home",
        requiresAuth: true,
        roles: ["*"],
        ignoreCache: false,
      },
    },
  ],
}];

export default homeRouter;
