// @ts-nocheck
import type { App } from "vue";
import { AppLink, SvgIcon, Chart, Result } from "@/components";

export default function registerGlobalComponents(app: App): void {
  app.use(AppLink);
  app.use(SvgIcon);
  app.use(Chart);
  app.use(Result);
}
