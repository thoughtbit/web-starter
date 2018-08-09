// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import * as FastClick from 'fastclick';
import App from './App';
import router from './router';
import ApiService from './service/api.service';
import './styles/theme.styl';
import './styles/global.css';

FastClick.attach(document.body);

Vue.config.productionTip = false;

// 注册接口服务
ApiService.init();


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
