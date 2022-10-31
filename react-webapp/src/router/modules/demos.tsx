import { lazy } from "react";
import type { RouteObject } from "../types";
import BasicLayout from "@/layouts/basic-layout";

const Demos = lazy(() => import("@/pages/demos"));
// const Demo1 = lazy(() => import("@/pages/demos/demo1"));
// const Demo2 = lazy(() => import("@/pages/demos/demo2"));

const demoRouter: RouteObject[] = [
  {
    path: "/demos",
    element: <BasicLayout />,
    meta: {
      title: "例子演示",
      icon: "",
    },
    children: [
      {
        path: "",
        element: <Demos />,
        children: [
          { path: ":id", element: <>组件详情</> },
          { path: "list", element: <>组件列表</> },
        ],
      },
      {
        path: "index",
        children: [
          { index: true, element: <>组件首页</> },
          { path: "list", element: <>组件列表</> },
        ],
      },
    ],
  },
];

export default demoRouter;
