import router, { createRouter } from '@/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({
  showSpinner: false
});

router.beforeEach(async(to, from, next) => {
  // console.log('路由切换：', from.path, '===>', to.path);

  NProgress.start();
  // const hasToken = getToken();
  // 如果token存在
  if(/*hasToken*/!0) {
    // 登录后进入登录页
    if (to.path === '/login') {
      next();
      NProgress.done();
    } else {
      // 当进入非登录页时，需要进行权限校验




      next();
      NProgress.done();
    }
  } else {
    if(to.path !== '/login') {
      next(`/login?redirect=${escape(to.fullPath)}`);
      NProgress.done();
    } else {
      next();
      NProgress.done();
    }
  }
});

router.afterEach((to) => {
  NProgress.done();
});
