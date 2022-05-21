import type { App } from "vue";
import Menu from "./index.vue";
import InfiniteMenu from "./menu.tsx";

// 让这个组件可以通过use的形式使用
export default {
  install(app: App) {
    app.component("ui-menu", Menu);
    app.component("ui-infinite-menu", InfiniteMenu);
  },
};
