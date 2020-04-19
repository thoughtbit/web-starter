import router from "@/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  showSpinner: false
});

const whiteList = ["/login", "/auth-redirect", "/register"];

router.beforeEach(async(to, from, next) => {
  // console.log('路由切换：', from.path, '===>', to.path);

  NProgress.start();
  // const hasToken = getToken();
  // 如果token存在
  if(/*hasToken*/false) {
    // 登录后进入登录页
    if (to.path === "/login") {
      next({ path: '/' });
      NProgress.done();
    } else {
      // 当进入非登录页时，需要进行权限校验




      next();
      NProgress.done();
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      // next(`/login?redirect=${escape(to.fullPath)}`);
      next();
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
