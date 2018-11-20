/* eslint-disable */
import './plugins';

import Vue from 'vue';
import * as FastClick from 'fastclick';
import App from './App';
import router from './router';
import store from './store'
import i18n from './i18n'
import ApiService from './service/api.service';

import directives from './directives';

import './styles/theme.styl';
import './styles/global.css';

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body);
  }, false);
}

Vue.config.productionTip = false;

// 注册接口服务
ApiService.init();

// router.afterEach((toRoute) => {
//   window.scrollTo(0, 0);
// });

// router.beforeEach((to, from, next) => {
//   return Promise
//     .all([store.dispatch(CHECK_AUTH)])
//     .then(next);
// });

directives.map(directive => Vue.use(directive));

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>',
});
