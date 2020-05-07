import { VueConstructor } from "vue";
import VueEcharts from "./vue-echarts.vue";

export default {
  install(Vue: VueConstructor, options = {}) {
    Vue.component("ui-chart", VueEcharts);
  }
};
