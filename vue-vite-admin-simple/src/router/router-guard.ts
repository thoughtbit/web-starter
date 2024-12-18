// @ts-nocheck
import type { Router } from "vue-router";


export function createRouterGuard(router: Router) {
  /*
  // 全局前置守卫
  router.beforeEach(async (to, from, next) => {
    console.log("路由前置守卫:", to, from);
  });

  // 全局后置守卫
  router.afterEach(async (to, form, failure) => {
    console.log("路由后置守卫:", to, from, failure);
  });
  */

  // 全局错误守卫
  router.onError((error) => {
    console.log("路由错误:", error);
  });
}
