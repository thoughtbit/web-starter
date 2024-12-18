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
