import type { App } from "vue";
import Component from "./result.vue";

Component.install = (app: App) => {
  app.component(Component.name, Component);
};

export default Component;
