import Vue, { DirectiveOptions } from "vue";
import ElementUI from "element-ui";
import VueMeta from "vue-meta";
import VueEcharts from "@/plugins/vue-echarts";
import * as directives from "@/directives";
import * as filters from "@/filters";
import i18n from "@/locales";
import EventBus from "@/utils/event-bus";
import Responsive from "@/utils/responsive";
import GlobalUtils from "@/utils/global";

// 注册 element-ui
Vue.use(ElementUI, {
  i18n: (key: string, value: string) => i18n.t(key, value)
});

// 注册事件中心
Vue.use(EventBus);

// 注册 vue-meta
Vue.use(VueMeta);

Vue.use(Responsive, {
  computed: {
    mobile(): boolean {
      // @ts-ignore
      return this.width <= 768;
    },
    tablet(): boolean {
      // @ts-ignore
      return this.width <= 1024;
    },
    desktop(): boolean {
      return !this.tablet;
    },
    wide(): boolean {
      // @ts-ignore
      return this.width >= 1280;
    }
  }
});

// 注册完整的 Echarts
Vue.use(VueEcharts);

// 注册 全局集合
Vue.use(GlobalUtils);

// 注册 过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, (filters as { [key: string]: Function })[key]);
});

// 注册指令
Object.keys(directives).forEach((key) => {
  Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key]);
});
