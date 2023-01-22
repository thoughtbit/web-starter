import { createApp } from "vue";
import App from "./App.vue";
import { setupRouter } from "./router";
import { setupStore } from "./store";
import { setupI18n } from "./locales";
import { registerGlobalComponents, globalProperties, globalError } from "./plugins";

import { AppContextKey } from "./constants";

import "virtual:svg-icons-register";
import "toastify-js/src/toastify.css";
import "./assets/styles/app.scss";

// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss";



const app = createApp(App);
(async () => {
  // 注册全局状态
  setupStore(app);

  // 国际化
  setupI18n(app);

  // 错误日志收集
  globalError(app);
  // 注册公共插件
  registerGlobalComponents(app);
  // 全局属性
  globalProperties(app);

  // 挂载路由
  await setupRouter(app);

  // 路由准备就绪后挂载 App
  app.mount("#app");

  // 注入appData 数据
  // app.provide(AppContextKey, {
  //   routes: routes,
  // });
})();
