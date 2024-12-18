import type { App } from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { request } from "@/services";
import bus from "@/utils/bus";

export default function globalProperties(app: App) {
  dayjs.locale("zh-cn");
  // 全局属性
  app.config.globalProperties = {
    $request: request,
    $bus: bus,
    $dayjs: dayjs,
  };
}
