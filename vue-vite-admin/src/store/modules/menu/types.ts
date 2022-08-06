export type MenuOptions = {
  path: string; // 路由地址
  name?: string; // 路由名称
  title: string; // 标题
  icon?: string;  // 图标
  link?: string; // 外链
  close?: boolean;
  children?: MenuOptions[];
};

export type State = {
  menuList: MenuOptions[];
  activeIndex: number;
  isCollapsed: boolean;
};
