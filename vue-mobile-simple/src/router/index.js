import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/home';
import NotFound from '@/views/404';

// const Service = r => require.ensure([], () => r(require('@/views/service')), 'service');

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '*',
      name: 'Error',
      component: NotFound,
    },
  ],
});
