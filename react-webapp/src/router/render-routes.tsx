import { Route } from "react-router-dom";
import { resolve } from "@/utils/util";
import type { RouteObject } from "@/router/types";

type TRenderRoutes = (routes: RouteObject[], parentPath?: string) => React.ReactNode[];

// 递归生成路由数
const genRoute = (route: RouteObject, parentPath: string) => {
  const { element, children, index, path } = route;
  const currentPath = resolve(parentPath, path);
  if (route.children?.length === 0) {
    return <Route key={currentPath} path={currentPath} index={index} element={element} />;
  } else {
    return (
      <Route key={currentPath} index={index} path={currentPath} element={element}>
        {children?.map((child: any) => genRoute(child, currentPath))}
      </Route>
    );
  }
};

// 渲染应用路由
export const renderRoutes: TRenderRoutes = (routes, parentPath = "") => {
  return routes.map((route: RouteObject) => {
    return genRoute(route, parentPath);
  });
};
