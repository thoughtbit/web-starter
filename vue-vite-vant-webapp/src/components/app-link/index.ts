import type { App } from "vue";
import Component from "./app-link.vue";

Component.install = (app: App) => {
  app.component(Component.name, Component);
};

export default Component;
