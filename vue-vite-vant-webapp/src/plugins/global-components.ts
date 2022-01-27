import type { App } from "vue";
import { AppLink } from "@/components/app-link";

export default function registerGlobalComponents(app: App): void {
  app.component("app-link", AppLink);
}
