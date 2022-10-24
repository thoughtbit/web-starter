import { isNavigationFailure } from "vue-router";
import type { Router } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { isLogin } from "@/utils/auth";
import { setRouteEmitter } from "@/router/route-listener";

NProgress.configure({
  showSpinner: false,
});

const whiteList = ["register", "login", "forget"];

// 创建路由守卫
export function createRouterGuard(router: Router) {
  router.beforeEach(async (to) => {
    // emit route change
    await setRouteEmitter(to);
  });

  // 全局前置守卫
  router.beforeEach((to: any, from: any, next: any) => {
    NProgress.start();
    if (isLogin()) {
      if (to.name == "login") {
        next({ path: "/", replace: true });
        NProgress.done();
      } else {
        const hasRoute = router.hasRoute(to.name!);
        if (whiteList.includes(to.name as string) || hasRoute) {
          next();
        }
      }
    } else {
      if (whiteList.includes(to.name as string)) {
        next();
      } else {
        next({ path: "/login", query: { redirect: to.fullPath }, replace: true });
        NProgress.done();
      }
    }

    next();
  });

  // 全局后置守卫
  router.afterEach((to, form, failure) => {
    if (isNavigationFailure(failure)) {
      return;
    }
    NProgress.done();
  });

  router.onError((error) => {
    console.log("路由错误:", error);
  });
}
