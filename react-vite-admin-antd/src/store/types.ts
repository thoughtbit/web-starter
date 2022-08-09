export type AuthSlice = {
  user: null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: any) => void;
  logout: () => void;
};

export type GlobalsSlice = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  reset: () => void;
};

export type StoreState = AuthSlice & GlobalsSlice;
