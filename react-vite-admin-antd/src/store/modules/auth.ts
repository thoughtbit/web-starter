import type { StateCreator } from "zustand";
import type { StoreState, AuthSlice } from "../types";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const createAuthSlice: StateCreator<
  StoreState,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  AuthSlice
> = (set) => ({
  ...initialState,
  login: (token, user) => set(() => ({ token, user })),
  logout: () =>
    set(() => ({
      token: null,
      user: null,
    })),
});
