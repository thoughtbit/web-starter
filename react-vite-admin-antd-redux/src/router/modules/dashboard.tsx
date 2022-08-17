import { lazy } from "react";
import BasicLayout from "@/layouts/basic-layout";
import type { RouteObject } from "../types";
import PrivateRoute from "../private-route";

const Dashboard = lazy(() => import("@/pages/dashboard/workplace"));

const dashboardRouter: RouteObject[] = [
  {
    path: "/dashboard",
    element: <BasicLayout />,
    meta: {
      title: "统计报表",
      icon: "",
    },
    children: [
      { index: true, element: <>总览</> },
      {
        path: "workplace",
        element: <Dashboard />,
        meta: {
          title: "概览仪表盘",
        },
      },
    ],
  },
];

export default dashboardRouter;
