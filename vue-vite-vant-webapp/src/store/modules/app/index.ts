import { defineStore } from "pinia";
import type { State } from "./types";

export const useAppStore = defineStore("app", {
  state: (): State => ({}),
  getters: {},
  actions: {},

  // 开启数据缓存
  persist: true,
});
