import { defineStore } from "pinia";

export type State = {};

export const useAppStore = defineStore("app", {
  state: (): State => ({}),
  getters: {},
  actions: {},

  // 开启数据缓存
  persist: true,
});
