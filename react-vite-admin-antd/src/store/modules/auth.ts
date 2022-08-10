import type { StateCreator } from "zustand";
import type { StoreState, AuthSlice } from "../types";
import { api } from "@/services";

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
  login: async (params) => {
    return await api
      .login(params)
      .then((result: any) => {
        console.log("用户登录:", result);
        const { code, data } = result;
        if (code === 0) {
          set({ token: data.token, user: data });
          return result;
        } else {
          set({ token: null, user: null });
          return result;
        }
      })
      .catch((error: any) => {
        set({ token: null, user: null });
        return error;
      });
  },
  logout: async () => {
    return await api
      .logout()
      .then((result) => {
        console.log("退出登录:", result);
        set(() => ({
          token: null,
          user: null,
        }));
      })
      .catch((error: any) => {
        set({ token: null, user: null });
        return error;
      });
  },
});
