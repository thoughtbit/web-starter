import type { App } from "vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { use } from "echarts/core";
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";
import { BarChart, LineChart, PieChart, RadarChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  GraphicComponent,
  TitleComponent,
} from "echarts/components";

import { AppLink, SvgIcon, Icon, Chart, Toggle, Result } from "@/components";

use([
  CanvasRenderer,
  SVGRenderer,
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  GraphicComponent,
  TitleComponent,
]);

export default function registerGlobalComponents(app: App): void {
  // 全局注册ElementPlus图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }

  // 自定义通用组件注册
  app.use(AppLink);
  app.use(SvgIcon);
  app.use(Icon);
  app.use(Chart);
  app.use(Toggle);
  app.use(Result);
}
