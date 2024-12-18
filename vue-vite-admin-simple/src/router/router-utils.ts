import sortBy from "lodash/sortBy";
import type { RouteRecordRaw, RouteRecordNormalized } from "vue-router";
import { isExternal } from "@/utils";
import { Layout, ParentView, PageIframe, ExceptionComponent } from "./constants";
import type { CustomRouteMeta, CustomRouteRecordRaw, IRoute, IRoutesById } from "./types";
import type { RouteItem } from "./types";

const LayoutMap = new Map<string, () => Promise<typeof import("*.vue")>>();
LayoutMap.set("Layout", Layout);
LayoutMap.set("ParentView", ParentView);
LayoutMap.set("PageIframe", PageIframe);

// 匹配pages里面所有的.vue文件, 动态引入
const dynamicPagesModules: Record<string, () => Promise<any>> = import.meta.glob("/src/pages/**/*.vue");

export function getModulesKey() {
  return Object.keys(dynamicPagesModules).map((item) => item.replace("/src/pages/", "").replace(".vue", ""));
}

// 菜单数据转化为路由数据
export function filterAsyncRoutes<T = RouteItem>(routeList: RouteItem[]): T[] {
  return routeList.map((route) => {
    const routeRecord = createRouteRecord(route);
    if (route.children != null && route.children && route.children.length) {
      routeRecord.children = filterAsyncRoutes(route.children);
    } else {
      delete routeRecord.children;
    }
    return routeRecord as unknown as T;
  });
}

// 创建路由记录
function createRouteRecord(route: RouteItem): CustomRouteRecordRaw {
  const { name, path, component, redirect, meta } = route;
  const routeRecord: CustomRouteRecordRaw = {
    name: name,
    path: path,
    meta: meta,
  };

  if (component) {
    const layoutFound = LayoutMap.get(component);
    if (layoutFound) {
      // console.log("layoutFound:", layoutFound, component);
      routeRecord.component = layoutFound;
    } else {
      // console.log("dynamicImport:", component , dynamicImport(component));
      routeRecord.component = dynamicImport(component);
    }
  } else {
    routeRecord.component = Layout;
  }

  if (redirect) {
    routeRecord.redirect = redirect;
  }

  return routeRecord;
}

function dynamicImport(component: string) {
  try {
    const keys = Object.keys(dynamicPagesModules);
    const matchKeys = keys.filter((key) => {
      const k = key.replace("/src/pages", "");
      const startFlag = component.startsWith("/");
      const endFlag = component.endsWith(".vue") || component.endsWith(".tsx");
      const startIndex = startFlag ? 0 : 1;
      const lastIndex = endFlag ? k.length : k.lastIndexOf(".");
      return k.substring(startIndex, lastIndex) === component;
    });
    if (matchKeys?.length === 1) {
      const matchKey = matchKeys[0];
      return dynamicPagesModules[matchKey];
    }
    if (matchKeys?.length > 1) {
      throw new Error(
        'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure',
      );
    } else {
      console.warn(`Can't find ${component} in pages folder`);
    }


    // const key = keys.find((key) => {
    //   return key.includes(`${component}.vue`);
    // });
    // if (key) {
    //   return dynamicPagesModules[key];
    // }
    // console.warn(`Can't find ${component} in pages folder`);
  } catch (error) {
    console.error(error);
    return ExceptionComponent;
  }
}

export function filterRolesAsyncRoutes(routes: any[], roles: string[]) {
  const filterRoutes: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterRolesAsyncRoutes(tmp.children, roles);
      }
      filterRoutes.push(tmp);
    }
  });
  return filterRoutes;
}

// 找到第一个有效的路由
export function findFirstValidRoute(routes: RouteRecordRaw[]): string | undefined {
  for (const route of routes) {
    if (!route.meta?.hidden && !isExternal(route.path)) {
      return route.name as string;
    }
    if (route.children) {
      const name = findFirstValidRoute(route.children);
      if (name) {
        return name;
      }
    }
  }
}

// 过滤掉隐藏的路由
export function filterHiddenRoute(routes: RouteRecordRaw[]) {
  const routeList: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    if (!route.meta?.hidden && !isExternal(route.path)) {
      if (route?.children) {
        route.children = filterHiddenRoute(route.children);
      }
      routeList.push(route);
    }
  });
  return routeList;
}

// 根据路由路径查找路由对象
export function findRouteItemByPath(routes: RouteRecordRaw[], path: string) {
  let routeList: RouteRecordRaw[] = [];
  for (let i = 0; i < routes.length; i++) {
    const item = routes[i];
    if (item.path === path) {
      routeList = [item];
      break;
    } else {
      if (item?.children) {
        const children = findRouteItemByPath(item.children, path);
        if (children.length) {
          routeList = [item, ...children];
          break;
        }
      }
    }
  }
  return routeList;
}

export function hasPermission(roles: string[], route: RouteRecordRaw) {
  if (route?.meta?.roles) {
    return roles.some((role) => (route.meta as CustomRouteMeta).roles?.includes(role));
  } else {
    return true;
  }
}

/**
 * @description 排序侧边栏菜单
 */
export function orderRoutes(routes: RouteRecordRaw[]) {
  const showingRoutes = routes.filter((route) => !route.meta?.hidden);
  return sortBy(showingRoutes, (item: any) => item.meta?.order);
}

// -----------------------------------------------------------------------------

// 路由配置文件转化为路由对象
export function formatModules(_modules: Record<string, unknown>, result: RouteRecordNormalized[]) {
  Object.keys(_modules).forEach((key) => {
    // @ts-ignore
    const defaultModule = _modules[key].default || {};
    if (!defaultModule) return;
    const moduleList = Array.isArray(defaultModule) ? [...defaultModule] : [defaultModule];
    result.push(...moduleList);
  });
  return result;
}

export function mapModuleRouterList(modules: Record<string, unknown>): Array<RouteRecordRaw> {
  const routerList: Array<RouteRecordRaw> = [];
  Object.keys(modules).forEach((key) => {
    // @ts-ignore
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routerList.push(...modList);
  });
  return routerList;
}

// -----------------------------------------------------------------------------

/*
  const routes = createRoutes({
    routesById: routes,
    routeComponents: routeComponents,
  }) as any;
 */
export function createRoutes(opts: {
  routesById: IRoutesById;
  routeComponents: Record<string, any>;
  parentId?: string;
}) {
  const { routesById, parentId, routeComponents } = opts;
  return Object.keys(routesById)
    .filter((id) => routesById[id].parentId === parentId)
    .map((id) => {
      const route = createRoute({
        route: routesById[id],
        routeComponent: routeComponents[id],
        parentId,
      });

      const children = createRoutes({
        routesById,
        routeComponents,
        parentId: route.id,
      });

      if (children.length > 0) {
        // @ts-ignore
        route.children = children;
      }

      delete route.id;

      return route;
    });
}

export function createRoute(opts: { route: IRoute; routeComponent: any; parentId?: string }) {
  const { route } = opts;
  const { id, path, redirect, ...other } = route;

  if (redirect) {
    return {
      ...other,
      id,
      path,
      redirect,
    };
  }

  const item: Record<string, any> = {
    ...other,
    id,
    component: opts.routeComponent,
    path,
  };

  if (route.parentId === undefined && path && !path.startsWith("/")) {
    // fix Uncaught (in promise) Error: Route paths should start with a "/": "users" should be "/users".
    item.path = `/${path}`;
  }

  return item;
}
