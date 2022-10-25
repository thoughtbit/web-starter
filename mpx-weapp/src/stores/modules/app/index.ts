import { defineStore } from '@mpxjs/pinia';
import type { colorSchemeType, State } from './types';

export const useAppStore = defineStore('app', {
  state: (): State => ({
    // 颜色方案，可选值为 light、dark
    colorScheme: 'light',
  }),
  getters: {},
  actions: {
    // setThemeConfig
    setTheme(colorScheme: colorSchemeType) {
      this.colorScheme = colorScheme;
    },
    // 更新主题配置
    updateTheme(partial: Partial<State>) {
      // 批量更新
      this.$patch(partial);
    },
  },
});
