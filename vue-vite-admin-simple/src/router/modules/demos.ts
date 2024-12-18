import { Layout } from "@/router/constants";

import type { RouteRecordRaw } from "vue-router";

const demosRouter: RouteRecordRaw[] = [{
  path: "/demos",
  name: "Demos",
  component: Layout,
  props: { channelId: 17, channelName: "演示菜单" },
  meta: {
    title: "演示",
    icon: "demo",
    requiresAuth: true,
    ignoreCache: false,
  },
  children: [
    {
      path: "",
      name: "DemoIndex",
      component: () => import("@/pages/demos/index.vue"),
      meta: {
        title: "演示1",
        icon: "page",
        requiresAuth: true,
        roles: ["*"],
        ignoreCache: false,
      },
    }
  ],
}];

export default demosRouter;
