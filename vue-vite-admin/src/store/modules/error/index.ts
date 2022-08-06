import { defineStore } from "pinia";
import type { State } from "./types";

export const useAppStore = defineStore("error", {
  state: (): State => ({
    errors: {},
  }),
  getters: {
    getError(state) {
      return (name: string) => state.errors[name]
    },
    hasError(state) {
      return Object.keys(state.errors).length > 0
    },
  },
  actions: {
    resetError() {
      this.errors = {}
    },
    setErrors(errors: Record<string, string[]>) {
      Object.entries(errors).forEach(([key, value]) => {
        this.errors[key] = value[0]
      })
    },
    clearError(name: string) {
      if (this.errors[name]) {
        delete this.errors[name]
      }
    },
  },

  // 开启数据缓存
  persist: true,
});