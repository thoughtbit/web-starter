import { createApp } from "vue";
import App from "./App.vue";
import router, { setupRouter } from "./router";
import { setupStore } from "./store";
import { registerGlobalComponents, globalProperties, globalError } from "./plugins";
import i18n from './locales';

import "toastify-js/src/toastify.css";
import "./assets/styles/app.scss";

(async () => {
  const app = createApp(App);


  // 注册路由
  setupRouter(app);
  // 注册全局状态
  setupStore(app);

  // 国际化
  app.use(i18n);

  // 错误日志收集
  globalError(app);
  // 注册公共插件
  registerGlobalComponents(app);
  // 全局属性
  globalProperties(app);

  // Mount when the route is ready
  // https://next.router.vuejs.org/api/#isready
  await router.isReady();



  app.mount("#app");
})();
