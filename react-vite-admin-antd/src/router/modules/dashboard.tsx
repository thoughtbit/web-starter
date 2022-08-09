import { lazy } from "react";
import type { RouteObject } from "../types";

const Dashboard = lazy(() => import("@/pages/dashboard/workplace"));

const dashboardRouter: RouteObject[] = [
  {
    path: "/dashboard",
    meta: {
      title: "统计报表",
      icon: "",
    },
    children: [
      {
        path: "workplace",
        element: <Dashboard />,
        component: Dashboard,
        meta: {
          title: "概览仪表盘",
        },
      },
    ],
  },
];

export default dashboardRouter;
