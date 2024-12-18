import type { App } from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { ajax } from "@/services";
import bus from "@/utils/bus";
import modal from './modal'

/**
 * 使用方式
 *
 * const { proxy } = getCurrentInstance();
 * proxy.$.ajax.get();
 */
export default function globalProperties(app: App) {
  dayjs.locale("zh-cn");
  // 全局属性
  app.config.globalProperties = {
    $ajax: ajax,
    $bus: bus,
    $dayjs: dayjs,
    $modal: modal,
  } as any;
}
