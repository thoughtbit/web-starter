import type { RouteObject } from "@/router/types";

/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const findRoute = (path: string, routes: RouteObject[] = []): RouteObject => {
  let result: RouteObject = {};
  for (let item of routes) {
    if (item.path === path) return item;
    if (item.children) {
      const res = findRoute(path, item.children);
      if (Object.keys(res).length) result = res;
    }
  }
  return result;
};

/* 
const { pathname } = useLocation();
const route = findRoute(pathname, routers); 

// 判断当前路由是否需要访问权限(不需要权限直接放行)
if (!route.meta?.requiresAuth) return props.children;
*/
