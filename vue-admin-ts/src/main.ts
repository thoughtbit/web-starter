import Vue from "vue";
import ElementUI from "element-ui";
import App from "@/App.vue";
import i18n from "@/locales";
import router from "@/router";
import store from "@/store";
import SentryHelper from "@/utils/sentry-helper";

// PWA
import "@/registerServiceWorker";

import '@/assets/styles/index.scss';

// 错误日志收集
import "@/error";

// 开启Sentry 错误日志收集
if (process.env.NODE_ENV === "production" && process.env.VUE_APP_SENTRY_ENABLED) {
  const { VUE_APP_SENTRY_DSN } = process.env;
  const sentry = SentryHelper.getInstance(Vue, {
    dsn: VUE_APP_SENTRY_DSN,
    // @ts-ignore
    release: __VERSION__,
    environment: "Prod" // "Prod" | "Staging"
  })

  // @ts-ignore
  window.$sentry = sentry;

  Vue.config.errorHandler = (error, vm, info) => {
    // @ts-ignore
    window.$sentry.log({
      error,
      type: 'vue errorHandler',
      vm,
      info
    });
  }
}

// 鉴权和路由守卫
import "@/router/permission";

// 注册 element-ui
Vue.use(ElementUI, {
  i18n: (key: string, value: string) => i18n.t(key, value)
});

// 插件集合
import "@/plugins";

// 组件集合
import "@/registerComponents";

Vue.config.productionTip = false;

// @ts-ignore
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount("#app");
