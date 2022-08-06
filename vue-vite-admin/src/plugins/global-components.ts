import type { App } from "vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { AppLink, SvgIcon, Result, Dialog, Table, Panel, Chart } from "@/components";
export default function registerGlobalComponents(app: App): void {
  // 注册所有的element图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }

  // 自定义通用组件注册
  app.use(AppLink);
  app.use(SvgIcon);
  app.use(Result);
  app.use(Dialog);
  app.use(Table);
  app.use(Panel);
  app.use(Chart);
}
