import { lazy } from "react";
import BasicLayout from "@/layouts/basic-layout";
import type { RouteObject } from "../types";

const Users = lazy(() => import("@/pages/users"));

const userManageRouter: RouteObject[] = [
  {
    path: "/user",
    element: <BasicLayout />,
    meta: {
      title: "个人页",
      icon: "",
    },
    children: [
      {
        path: "index",
        element: <Users />,
        meta: {
          title: "个人中心",
        },
      },
    ],
  },
];

export default userManageRouter;
