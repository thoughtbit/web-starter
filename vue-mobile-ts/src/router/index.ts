import Vue, { AsyncComponent } from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { PositionResult } from "vue-router/types/router";
import { routesConfig } from "@/router/router.config";

// 修复 Uncaught (in promise) undefined 问题
const originalPush = VueRouter.prototype.push;
// @ts-ignore
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  // @ts-ignore
  return originalPush.call(this, location).catch(err => err);
}
Vue.use(VueRouter);

// 路由实例化
export const createRouter = (): VueRouter => {
  return new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    linkActiveClass: "is-active",
    scrollBehavior: (to, from, savedPosition): PositionResult => {
      if (to.hash) {
        return {
          selector: to.hash
        };
      } else if (savedPosition) {
        return savedPosition;
      } else if (to.path !== from.path) {
        return { x: 0, y: 0 }
      }
    },
    routes: routesConfig
  });
};

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher;
}

export default router;
