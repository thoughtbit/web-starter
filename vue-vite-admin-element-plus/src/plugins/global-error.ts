import { nextTick } from "vue";
import type { App, ComponentPublicInstance } from "vue";

export default function globalError(app: App) {
  app.config.errorHandler = (err: unknown, vm: ComponentPublicInstance | null, info: string) => {
    // 上报日志
    // const store = userStore();
    // store.commit("logs/ADD_LOGS", {
    //   type: "error",
    //   message: err.message,
    //   stack: err.stack,
    //   info
    // });

    // 打印日志
    nextTick(() => {
      if (process.env.NODE_ENV === "development") {
        console.group(">>>>>> [错误信息] >>>>>>");
        console.error(info);
        console.groupEnd();
        console.group(">>>>>> [Vue 实例] >>>>>>");
        console.log(vm);
        console.groupEnd();
        console.group(">>>>>> [Error] >>>>>>");
        console.log(err);
        console.groupEnd();
      }
    });
  };
}
