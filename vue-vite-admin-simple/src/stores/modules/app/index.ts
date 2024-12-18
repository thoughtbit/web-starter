import { nextTick } from "vue";
import { defineStore } from "pinia";
import type { State, ThemeConfig } from "./types";

export const useAppStore = defineStore("app", {
  state: (): State => ({
    // 颜色方案，可选值为 light、dark
    colorScheme: "light",
    // element组件大小
    assemblySize: "default",
    // themeConfig
    themeConfig: {
      // 默认 primary 主题颜色
      primary: "#409eff",
      // 是否开启深色模式
      isDark: false,
    },

    // 是否刷新路由
    isRouteShow: true,
  }),
  getters: {},
  actions: {
    // setAssemblySizeSize
    setAssemblySizeSize(assemblySize: string) {
      this.assemblySize = assemblySize;
    },
    // setThemeConfig
    setThemeConfig(themeConfig: ThemeConfig) {
      this.themeConfig = themeConfig;
    },
    // 更新主题配置
    updateThemeConfig(partial: Partial<State>) {
      // 批量更新
      this.$patch(partial);
    },
    refreshView() {
      this.isRouteShow = false;
      nextTick(() => {
        this.isRouteShow = true;
      });
    },
  },

  // 开启数据缓存
  persist: true,
});
