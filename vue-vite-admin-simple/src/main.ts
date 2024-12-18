import { createApp } from "vue";
import ElementPlus from "element-plus";
import "uno.css";
import "element-plus/dist/index.css";
import "@/assets/styles/app.scss";
import "virtual:svg-icons-register";
import App from "./App.vue";
import { globalProperties, registerGlobalComponents } from "./plugins";
import { setupRouter } from "./router";
import { setupStore } from "./stores";

async function bootstrap() {
  const app = createApp(App);

  app.use(ElementPlus);

  // 注册公共插件
  registerGlobalComponents(app);
  // 全局属性
  globalProperties(app);

  // 注册全局状态
  setupStore(app);

  // 挂载路由
  await setupRouter(app);

  app.mount("#app");
}

bootstrap();
