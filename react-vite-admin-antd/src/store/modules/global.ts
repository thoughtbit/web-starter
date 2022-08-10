import { type StateCreator } from "zustand";
import type { StoreState, GlobalsSlice, MenuOptions } from "../types";
import { api } from "@/services";

const initialState = {
  darkMode: true,
  menuList: [],
};

export const createGlobalsSlice: StateCreator<
  StoreState,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  GlobalsSlice
> = (set) => ({
  ...initialState,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  reset: () => {
    set({ ...initialState });
  },
  setMenuList: (menuList: MenuOptions[]) => {
    set({
      menuList: menuList,
    });
  },
  getMenuList: async () => {
    await api
      .getMenuList()
      .then((result: any) => {
        if (result.code == 0) {
          set({
            menuList: result.data,
          });
        } else {
          return result.data;
        }
      })
      .catch((error) => {
        set({
          menuList: [],
        });
      });
  },
});
