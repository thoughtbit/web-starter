import { defineStore } from "pinia";
import type { State } from "./types";

export const useUserStore = defineStore("user", {
  state: (): State => ({
    token: "",
  }),
  getters: {
    getToken(state): string {
      return state.token || "";
    },
  },
  actions: {
    setToken(token: string | undefined) {
      // 批量更新
      this.$patch((state) => {
        state.token = token ?? "";
      });
    },
    clear() {
      this.$reset();
    },
  },

  // 开启数据缓存
  persist: true,
});
