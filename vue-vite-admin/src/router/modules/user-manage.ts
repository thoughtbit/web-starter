import { Layout } from "@/layouts";
import type { RouteRecordRaw } from "vue-router";

const userManageRouter: RouteRecordRaw = {
  path: "/user-manage",
  name: "userManage",
  component: Layout,
  redirect: { name: "userManageAdd" },
  meta: {
    title: "用户管理",
    icon: "user",
    requiresAuth: true,
  },
  children: [
    {
      path: "list",
      name: "userManageList",
      component: () => null,
      meta: {
        title: "用户列表",
        icon: "page",
        requiresAuth: true,
        roles: ["*"],
      },
    },
  ],
};

export default userManageRouter;
