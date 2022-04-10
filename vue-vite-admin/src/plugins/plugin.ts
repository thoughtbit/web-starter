import type { Plugin } from "vue";
import { AppLink } from "@/components/app-link";
import { Chart } from "@/components/chart";

export function createPlugin(): Plugin {
  return {
    install(app) {
      app.component("AppLink", AppLink);
      app.component("Chart", Chart);
    },
  };
}

// 使用
// app.use(CustomPlugin)
