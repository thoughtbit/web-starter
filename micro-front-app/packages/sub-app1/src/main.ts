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

function storeTest(props: any) {
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

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}

export async function mount(props: any) {
  console.log('[vue] props from main framework', props);
  storeTest(props);
  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance = null;
  router = null;
}
