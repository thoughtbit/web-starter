import { lazy } from "react";
import type { RouteObject } from "../types";

const Demos = lazy(() => import("@/pages/demos"))
const Demo1 = lazy(() => import("@/pages/demos/demo1"))
const Demo2 = lazy(() => import("@/pages/demos/demo2"))
const Demo3 = lazy(() => import("@/pages/demos/demo3"))
const Demo4 = lazy(() => import("@/pages/demos/demo4"))
const Demo5 = lazy(() => import("@/pages/demos/demo5"))

const demoRouter: RouteObject[] = [
  {
    path: "/demos",
    meta: {
      title: "例子演示",
      icon: "",
    },
    children: [
      {
        path: "demo1",
        element: <Demo1/>,
        meta: {
          title: "例子1",
        },
      },
      {
        path: "demo2",
        element: <Demo2/>,
        meta: {
          title: "例子2",
        },
      },
      {
        path: "demo3",
        element: <Demo3/>,
        meta: {
          title: "例子3",
        },
      },
      {
        path: "demo4",
        element: <Demo4/>,
        meta: {
          title: "例子4",
        },
      },
      {
        path: "demo5",
        element: <Demo5/>,
        meta: {
          title: "例子5",
        },
      },
    ],
  },
];

export default demoRouter;
