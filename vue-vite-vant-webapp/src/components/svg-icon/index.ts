import type { App } from "vue";
import Component from "./svg-icon.vue";

Component.install = (app: App) => {
  app.component(Component.name, Component);
};

export default Component;
