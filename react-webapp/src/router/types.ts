export type RouteObject = {
  path?: string;
  index?: boolean;
  element?: React.ReactNode;
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

export interface IRoute {
  id: string;
  path?: string;
  index?: boolean;
  parentId?: string;
  redirect?: string;
  clientLoader?: () => Promise<any>;
  hasServerLoader?: boolean;
}

export interface IClientRoute {
  id: string;
  element: React.ReactNode;
  children?: IClientRoute[];
  // compatible with @ant-design/pro-layout
  routes?: IClientRoute[];
  path?: string;
  index?: boolean;
  parentId?: string;
  clientLoader?: () => Promise<any>;
}

export interface IRoutesById {
  [id: string]: IRoute;
}

export interface IRouteComponents {
  [id: string]: any;
}

export interface ILoaderData {
  [routeKey: string]: any;
}