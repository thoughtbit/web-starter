import { createApp } from "vue";
import { createPinia } from "pinia";

import ElementPlus from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-cn"; // 中文语言

import "toastify-js/src/toastify.css";
import "element-plus/dist/index.css";
import "virtual:svg-icons-register";

import { SvgIcon, Table, Dialog, Form, Menu } from "./components";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(SvgIcon);
app.use(Table);
app.use(Dialog);
app.use(Form);
app.use(Menu);

// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
  locale: locale,
  // 支持 large、default、small
  size: "default",
});
app.use(createPinia());
app.use(router);

app.mount("#app");
