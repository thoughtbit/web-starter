import type { App } from "vue";
import { AppLink } from "@/components/app-link";
import { Chart } from "@/components/chart";

export default function registerGlobalComponents(app: App): void {
  app.component("app-link", AppLink);
  app.component("chart", Chart);
}
