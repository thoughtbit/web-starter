import type { App } from "vue";
import Component from "./index.vue";

// 让这个组件可以通过use的形式使用
Component.install = (app: App) => {
  app.component(Component.name, Component);
};

export default Component;
