import { defineComponent } from "vue";
import type { RouteMeta, NavigationGuard, RouteRecordRaw } from "vue-router";

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  // @ts-ignore
  | (() => Promise<typeof import("*.vue")>)
  | (() => Promise<T>);

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
  /* 菜单标题 */
  title?: string;
  /* 菜单图标 */
  icon?: string;
  /* 角色权限 */
  roles?: string[];
  /* 菜单排序号 */
  order: number;
  /* 是否为隐藏路由 */
  hidden?: boolean;
  /* 是否显示菜单展开图标 */
  showExpand?: boolean;
}

export interface CustomRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
  meta: CustomRouteMeta;
}
