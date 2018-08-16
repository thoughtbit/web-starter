import Vue from 'vue';
import VueMeta from 'vue-meta';
import localStore from './utils/local-store';
import * as Filters from './utils/filters';
import Responsive from './utils/responsive';
import SetSize from './utils/set-size';
import Focus from './utils/focus';
import { VueBus } from './plugins/vue-bus';

Vue.use(VueMeta);
Vue.use(Responsive, {
  computed: {
    mobile() {
      return this.width <= 768;
    },
    tablet() {
      return this.width <= 900;
    },
    desktop() {
      return !this.tablet;
    },
    wide() {
      return this.width >= 1300;
    },
  },
});

// 注册UI组件
// Vue.use();

// 全局事件中心
Vue.use(VueBus);

// 注册过滤器
for (const key in Filters) {
  Vue.filter(key, Filters[key]);
}

Vue.directive('set-size', SetSize);
Vue.directive('focus', Focus);

// 本地存储
Vue.prototype.$storage = localStore;
