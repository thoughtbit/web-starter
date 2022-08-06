import type { RouteLocationNormalized } from "vue-router";
import { defineStore } from "pinia";
import { TabBarState, TabOptions } from "./types";

const formatTag = (route: RouteLocationNormalized): TabOptions => {
  const { name, fullPath, query } = route;
  return {
    title: "",
    name: String(name),
    fullPath,
    query,
  };
};

export const useTabBarStore = defineStore("tabbar", {
  state: (): TabBarState => ({
    cacheTabList: new Set(),
    tabList: [
      // Set the first element dynamically as needed
      {
        title: "menu.dashboard",
        name: "dashboard",
        fullPath: "/dashboard",
      },
    ],
  }),

  getters: {
    getTabList(): TabOptions[] {
      return this.tabList;
    },
    getCacheList(): string[] {
      return Array.from(this.cacheTabList);
    },
  },

  actions: {
    updateTabList(route: RouteLocationNormalized) {
      this.tabList.push(formatTag(route));
      if (!route.meta.ignoreCache) {
        this.cacheTabList.add(route.name as string);
      }
    },
    deleteTag(idx: number, tag: TabOptions) {
      this.tabList.splice(idx, 1);
      this.cacheTabList.delete(tag.name);
    },
  },

  // 开启数据缓存
  persist: true,
});
