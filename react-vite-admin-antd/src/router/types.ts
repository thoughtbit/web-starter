import type { BrowserRouterProps } from "react-router-dom";

export type RouteObject = {
  path: string;
  name?: string;
  redirect?: string;
  element?: React.ReactNode;
  component?: React.FC<BrowserRouterProps> | (() => any);
  /**
   * 当前路由是否全屏显示
   */
  isFullPage?: boolean;
  /**
   * meta未赋值 路由不显示到菜单中
   */
  meta?: {
    title?: string;
    requiresAuth?: boolean;
    icon?: string;
    /**
     * 侧边栏隐藏该路由
     */
    hidden?: boolean;
    /**
     * 单层路由
     */
    single?: boolean;
    /**
     * 角色
     */
    roles?: string[];
  };
  children?: RouteObject[];
};
