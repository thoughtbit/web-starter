import { BlankLayout } from "@/router/constants";
import type { RouteRecordRaw } from "vue-router";

const reviewRouter: RouteRecordRaw[] = [
  {
    path: "/review",
    name: "Review",
    component: BlankLayout,
    meta: {
      icon: "home",
      title: "首页",
      requiresAuth: true,
      ignoreCache: false,
    },
    children: [
      {
        path: "index",
        component: () => import("@/pages/review/index.vue"),
        name: "ReviewIndex",
        meta: {
          title: "首页",
          icon: "home",
          requiresAuth: true,
          roles: ["*"],
          ignoreCache: false,
        },
      },
    ],
  }
];

export default reviewRouter;
