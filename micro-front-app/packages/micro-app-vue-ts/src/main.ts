import Vue from "vue";
import VueRouter from "vue-router";
import App from "@/App.vue";
import routes from "@/router";
import store from "@/store";

import "@/public-path";

Vue.config.productionTip = false;

let router = null;
let instance: any = null;
// @ts-ignore
const __qiankun__ = window.__POWERED_BY_QIANKUN__;

function render(props = {}) {
  // @ts-ignore
  const { container } = props;

  // 实例化路由时，判断当运行在qiankun环境时，路由要添加前缀，前缀与主应用注册子应用函数内的参数一致
  // @ts-ignore
  router = new VueRouter({
    base: __qiankun__ ? "/app1" : "/",
    mode: 'history',
    // @ts-ignore
    routes,
  });

  instance = new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

if (!__qiankun__) {
  render();
}

function initStore(props: any) {
  props.onGlobalStateChange &&
  props.onGlobalStateChange(
    (value: any, prev: any) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
    true,
  );
  props.setGlobalState &&
  props.setGlobalState({
    ignore: props.name,
    user: {
      name: props.name,
    },
  });
}

// 导出子应用生命周期 挂载前, 例如: props参数即为主应用传递给子应用的数据
export async function bootstrap(props = {}) {
  console.log('[vue] vue app bootstraped', props);
}

// 导出子应用生命周期 挂载前 挂载后
export async function mount(props: any) {
  console.log('[vue] props from main framework', props);
  initStore(props);
  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance = null;
  router = null;
}
