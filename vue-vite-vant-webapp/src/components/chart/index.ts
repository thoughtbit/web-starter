import type { App } from "vue";
import Component from "./chart.vue";

Component.install = (app: App) => {
  app.component(Component.name, Component);
};

export default Component;
