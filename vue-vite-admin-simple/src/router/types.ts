import { defineComponent } from "vue";
import type { RouteMeta, NavigationGuard, RouteRecordRaw, RouterOptions } from "vue-router";
export type { RouterHistory } from "vue-router";

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  // @ts-ignore
  | (() => Promise<typeof import("*.vue")>)
  | (() => Promise<T>);

export interface RouteItem {
  path: string;
  name: string;
  component?: Component | string;
  components?: Component;
  redirect?: string;
  meta: RouteMeta;
  children?: Array<RouteItem>;
}

export interface AppRouteRecordRaw {
  path: string;
  name?: string | symbol;
  meta?: RouteMeta;
  redirect?: string;
  component: Component | string;
  children?: AppRouteRecordRaw[];
  alias?: string | string[];
  props?: Record<string, any>;
  beforeEnter?: NavigationGuard | NavigationGuard[];
  fullPath?: string;
}

export interface CustomRouteMeta extends RouteMeta {
  // 菜单标题
  title?: string;
  // 菜单图标
  icon?: string;
  // 角色权限
  roles?: string[];
  // 菜单排序号
  order?: number;
  // 是否为隐藏路由
  hidden?: boolean;
  // 外链
  link?: string;
  // 是否展开菜单
  expanded?: boolean;

  // 路径参数
  query?: Recordable<string>;
}

export interface CustomRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
  meta: CustomRouteMeta;
}

/*
routes
*/
export interface IRoute {
  id: string;
  path?: string;
  index?: boolean;
  parentId?: string;
  redirect?: string;
}

export interface IRoutesById {
  [id: string]: IRoute;
}

export interface IRouteComponents {
  [id: string]: any;
}

export type RouterConfig = Omit<RouterOptions, "history" | "routes">;
