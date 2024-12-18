/**
 * The vite-plugin-external provides a way of excluding dependencies from the runtime code and output bundles.
 * github.com/fengxinming/vite-plugins
 */
import vitePluginExternal from "vite-plugin-external";

import pkg from "./../../package.json";

function createPluginExternals() {
  return vitePluginExternal({
    externals: {
      // vue: 'Vue',
      '@vueuse/core': 'VueUse',
      // 'vue-router': 'VueRouter',
      'xgplayer': 'XgPlayer',
      'axios': 'axios',
      'dayjs': 'dayjs',
      'element-plus':'ElementPlus',
      'lodash':'_',
      'echarts': 'echarts',
      'vue-echarts': 'VueECharts',
      'vue-request': 'VueRequest'
    },
  });
}

export default createPluginExternals;
