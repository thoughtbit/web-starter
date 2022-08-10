export type MenuOptions = {
  path: string; // 路由地址
  name?: string; // 路由名称
  title: string; // 标题
  children?: MenuOptions[];
};

export type AuthSlice = {
  user: null;
  token: string | null;
  isAuthenticated: boolean;
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
