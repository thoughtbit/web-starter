import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

// PWA
import "@/registerServiceWorker";

import '@/assets/styles/index.scss';

// 错误日志收集
import "@/error";

// 鉴权和路由守卫
import "@/router/permission";

// 插件集合
import "@/plugins";

// 组件集合
import "@/registerComponents";

Vue.config.productionTip = false;

// @ts-ignore
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
