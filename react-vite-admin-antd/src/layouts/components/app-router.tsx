import { memo, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Spin } from "antd";
import { resolve } from "@/utils/path";
import { routers } from "@/router";
import type { RouteObject } from "@/router/types";
import Page from "./page";

import Styles from "./app-router.module.scss";

type TRenderRoutes = (routes: RouteObject[], parentPath?: string, breadcrumbs?: string[]) => React.ReactNode[];
/**
 * 渲染应用路由
 * @param routes
 * @param parentPath
 * @param breadcrumb
 */
const renderRoutes: TRenderRoutes = (routes, parentPath = "", breadcrumb = []) =>
  routes.map((route: RouteObject, index: number) => {
    const { component: Component, children, redirect, meta } = route;
    const currentPath = resolve(parentPath, route.path);
    let currentBreadcrumb = breadcrumb;

    if (meta?.title) {
      currentBreadcrumb = currentBreadcrumb.concat([meta?.title]);
    }

    if (redirect) {
      // 重定向
      return <Route key={index} path={currentPath} element={<Navigate to={redirect} replace />} />;
    }

    if (Component) {
      // 有路由菜单
      return (
        <Route
          key={index}
          path={currentPath}
          element={
            <Page isFullPage={route.isFullPage} breadcrumbs={currentBreadcrumb}>
              <Component />
            </Page>
          }
        />
      );
    }
    // 无路由菜单
    return children ? renderRoutes(children, currentPath, currentBreadcrumb) : null;
  });

const AppRouter = () => (
  <Suspense
    fallback={
      <div className={Styles.loading}>
        <Spin />
      </div>
    }
  >
    <Routes>{renderRoutes(routers)}</Routes>
  </Suspense>
);

export default memo(AppRouter);
