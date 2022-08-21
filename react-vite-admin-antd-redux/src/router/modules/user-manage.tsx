import { lazy } from "react";
import BasicLayout from "@/layouts/basic-layout";
import PrivateRoute from "../private-route";
import type { RouteObject } from "../types";

const Users = lazy(() => import("@/pages/users"));

const userManageRouter: RouteObject[] = [
  {
    path: "/user",
    element: (
      <PrivateRoute>
        <BasicLayout />
      </PrivateRoute>
    ),
    meta: {
      title: "个人页",
      icon: "",
    },
    children: [
      { index: true, element: <>用户中心</> },
      { path: "list", element: <Users />  },
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
