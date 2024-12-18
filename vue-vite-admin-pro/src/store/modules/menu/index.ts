import { defineStore } from "pinia";
import type { State, MenuOptions } from "./types";
import { api } from "@/services";

export const useMenuStore = defineStore("menu", {
  state: (): State => ({
    menuList: [],
    activeIndex: 0,
    isCollapsed: false,
  }),
  getters: {},
  actions: {
    setCollapsed() {
      this.isCollapsed = !this.isCollapsed;
    },

    setMenuList(menuList: MenuOptions[]) {
      this.menuList = menuList;
    },

    async getMenuList(role: string) {
      return await api
        .getMenuList(role)
        .then((result: any) => {
          if (result.code == 0) {
            this.setMenuList(result.data);
            return result.data;
          } else {
            return result.data;
          }
        })
        .catch((error) => {
          return error;
        });
    },
  },

  // 开启数据缓存
  persist: true,
});
