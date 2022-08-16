import { FC, lazy } from "react";
import { useRoutes, Navigate, Routes } from "react-router-dom";
import { Loadable, renderRoutes } from "@/components";
import { formatModules } from "@/utils/formatModules";
import type { RouteObject } from "./types";

const modules = import.meta.glob("./modules/*.tsx", { eager: true });
const appRouters = formatModules(modules, []);

const Login = lazy(() => import("@/pages/auth"));
const Result403 = lazy(() => import("@/pages/result/403"));
const Result404 = lazy(() => import("@/pages/result/404"));
const Result500 = lazy(() => import("@/pages/result/500"));

export const routers: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
    meta: {
      title: "首页",
    },
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      title: "登录页面",
      hidden: true,
      requiresAuth: false,
    },
  },
  ...appRouters,
  {
    path: "/403",
    element: <Result403 />,
    meta: {
      title: "403 Forbidden",
      requiresAuth: false,
    },
  },
  {
    path: "/500",
    element: <Result500 />,
    meta: {
      title: "500 Internal Server Error",
      requiresAuth: false,
    },
  },
  {
    path: "*",
    element: <Result404 />,
    meta: {
      title: "404 Not Found",
      requiresAuth: false,
    },
  },
];

export const useRouter = () => {
  const element = useRoutes(routers);
  return element;
};

export const RenderRouter: FC = () => {
  const element = renderRoutes(routers);
  return <Routes>{element}</Routes>;
};
