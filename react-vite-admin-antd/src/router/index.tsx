import { FC, lazy } from "react";
import { useRoutes } from "react-router-dom";
import { formatModules } from "@/utils/formatModules";
import type { RouteObject } from "./types";

const modules = import.meta.glob("./modules/*.tsx", { eager: true });
const appRouters = formatModules(modules, []);

const BasicLayout = () => import("@/layouts/basic-layout")
const Login = () => import("@/pages/login");
const Result403 = () => import("@/pages/result/403");
const Result404 = () => import("@/pages/result/404");
const Result500 = () => import("@/pages/result/500");

export const routers: RouteObject[] = [
  {
    path: "/login",
    name: "login",
    element: Login,
    component: lazy(Login),
    isFullPage: true,
    meta: {
      title: "登录页面",
      hidden: true,
      requiresAuth: false,
    },
  },
  {
    path: "/",
    element: BasicLayout,
    name: "workplace",
    redirect: "/dashboard/workplace",
  },
  ...appRouters,
  {
    path: "/403",
    name: "403",
    element: Result403,
    component: lazy(Result403),
    meta: {
      title: "403 Forbidden",
      requiresAuth: false,
    },
  },
  {
    path: "/500",
    element: Result403,
    component: lazy(Result500),
    meta: {
      title: "500 Internal Server Error",
      requiresAuth: false,
    },
  },
  {
    path: "*",
    element: Result403,
    component: lazy(Result404),
    meta: {
      title: "404 Not Found",
      requiresAuth: false,
    },
  },
];

export const renderRouter: FC = () => {
  const element = useRoutes(routers);
  return element;
};
