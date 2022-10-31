export type AuthSlice = {
  userInfo: null;
  token: string | null;
  isAuthenticated: boolean;
  authorities: string[];
  login: (params: any) => void;
  logout: () => void;
};

export type GlobalsSlice = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  reset: () => void;
};

export type StoreState = AuthSlice & GlobalsSlice;
