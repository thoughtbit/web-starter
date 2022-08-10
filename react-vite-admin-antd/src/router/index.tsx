import { FC, lazy } from "react";
import { useRoutes, Navigate, Routes } from "react-router-dom";
import { renderRoutes } from "@/components";
import { formatModules } from "@/utils/formatModules";
import BasicLayout from "@/layouts/basic-layout";
import type { RouteObject } from "./types";

const modules = import.meta.glob("./modules/*.tsx", { eager: true });
const appRouters = formatModules(modules, []);

const Login = lazy(() => import("@/pages/login"));
const Result403 = lazy(() => import("@/pages/result/403"));
const Result404 = lazy(() => import("@/pages/result/404"));
const Result500 = lazy(() => import("@/pages/result/500"));

export const routers: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/admin/index" />,
    meta: {
      title: "首页",
    },
  },
  {
    path: "/admin",
    element: <BasicLayout />,
    meta: {
      title: "系统路由",
    },
    children: [
      {
        path: "index",
        children: [
          { index: true, element: <>组件</> },
          { path: "list", element: <>组件2</> },
        ],
      },
      {
        path: "user",
        children: [
          { index: true, element: <>用户列表</> },
          { path: ":id", element: <>用户详情</> },
        ],
      },
    ],
  },
  {
    element: <BasicLayout />,
    children: [
      {
        path: "foo",
        element: <>foo</>,
      },
      {
        path: "bar",
        element: <>bar</>,
      },
    ],
  },
  {
    path: "/login",
    element: <>登录</>,
    meta: {
      title: "登录",
    },
  },
  { path: "*", element: <Result404 /> },
  // {
  //   path: "/login",
  //   name: "login",
  //   element: Login,
  //   isFullPage: true,
  //   meta: {
  //     title: "登录页面",
  //     hidden: true,
  //     requiresAuth: false,
  //   },
  // },
  // // ...appRouters,
  // {
  //   path: "/403",
  //   name: "403",
  //   element: Result403,
  //   meta: {
  //     title: "403 Forbidden",
  //     requiresAuth: false,
  //   },
  // },
  // {
  //   path: "/500",
  //   element: Result500,
  //   meta: {
  //     title: "500 Internal Server Error",
  //     requiresAuth: false,
  //   },
  // },
  // {
  //   path: "*",
  //   element: Result404,
  //   meta: {
  //     title: "404 Not Found",
  //     requiresAuth: false,
  //   },
  // },
];

export const useRouter = () => {
  const element = useRoutes(routers);
  return element;
};

export const RenderRouter: FC = () => {
  const element = renderRoutes(routers);
  return <Routes>{element}</Routes>;
};
