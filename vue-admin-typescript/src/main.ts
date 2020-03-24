import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

// PWA
import "@/registerServiceWorker";

// 全局样式
import "@/assets/styles/tailwind.css";

// 插件集合
import "@/plugins";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
