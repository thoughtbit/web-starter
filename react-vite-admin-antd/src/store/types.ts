export type MenuOptions = {
  path: string; // 路由地址
  title: string; // 标题
  icon?: string; // 图标
  children?: MenuOptions[];
};

export type AuthSlice = {
  userInfo: null;
  token: string | null;
  isAuthenticated: boolean;
  authorities: string[],
  login: (params: any) => void;
  logout: () => void;
};

export type GlobalsSlice = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  reset: () => void;

  menuList: MenuOptions[];
  setMenuList: (menuList: MenuOptions[]) => void;
  getMenuList: () => void;
};

export type StoreState = AuthSlice & GlobalsSlice;
