import Vue, { AsyncComponent } from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { PositionResult } from "vue-router/types/router";
import store from "@/store";
import { routesConfig } from "@/router/routes.config";
import { Logger } from "@/utils/logger";

// 修复 Uncaught (in promise) undefined 问题
const originalPush = VueRouter.prototype.push;
// @ts-ignore
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  // @ts-ignore
  return originalPush.call(this, location).catch(err => err);
}

Vue.use(VueRouter);

export const loadView = (view: string): AsyncComponent => (resolve) => require([`@/${view}`], resolve);

export function filterAsyncRoutes(routes: RouteConfig[]) {
  let routeList: RouteConfig[] = [];
  const loop = ({ routes, parentPath = "/" }: { routes: any; parentPath?: string }) => {
    if (routes instanceof Array && routes.length) {
      routes.forEach((route) => {
        let { children, ...rt } = route;
        if (rt.hidden) {
          rt.meta = {
            ...(rt.meta || {}),
            activeMenu: parentPath
          };
        }
        // @ts-ignore
        const component = rt.component;
        // console.log("component:", component);
        if (component && component != "component") {
          rt.component = loadView(component);
        }
        if (children instanceof Array && children.length) {
          const subMenus = children.filter((c) => c.menuType !== 2);
          if (subMenus.length) rt.redirect = subMenus[0].path;
        }
        routeList.push(rt);
        if (children) {
          loop({ routes: children, parentPath: rt.hidden ? parentPath : rt.path });
        }
      });
    }
  };
  loop({ routes: routes });
  return routeList;
}

// 根路由
export const rootRoute = {
  path: "/",
  component: () => import(/* webpackChunkName: "root" */ '@/views/layouts/menu-view.vue')
};

// 公共路由
export const commonRoutes = [
  {
    ...routesConfig.login
  },
  {
    ...routesConfig.sublogin
  },
  {
    ...routesConfig.qrcodelogin
  },
  {
    ...routesConfig.register
  },
  {
    ...routesConfig.forgot
  },
  {
    ...routesConfig.about
  },
  {
    ...routesConfig.callback
  }
];

// 错误和异常路由
export const exceptionRoutes = [
  {
    ...routesConfig.error
  },
  {
    ...routesConfig.unauthorized
  },
  {
    ...routesConfig.notFound
  }
];

// 路由实例化
export const createRouter = (routes: RouteConfig[]): VueRouter => {
  return new VueRouter({
    // mode: "history",
    base: process.env.BASE_URL,
    linkActiveClass: "is-active",
    scrollBehavior: (to, from, savedPosition): PositionResult => {
      if (to.hash) {
        return {
          selector: to.hash
        };
      } else if (savedPosition) {
        return savedPosition;
      } else if (to.path !== from.path) { // do not change scroll position when navigating on the same page (ex. change filters)
        return { x: 0, y: 0 }
      }
    },
    routes
  });
};

const routes = store.getters.routes.length ? store.getters.routes : commonRoutes
const router = createRouter(filterAsyncRoutes(routes));

/*
const routes = commonRoutes.concat(exceptionRoutes);
const router = createRouter([
  {
    ...rootRoute,
    children: [
      {
        name: "dashboard",
        path: "/dashboard",
        component: () => import("@/views/containers/dashboard/workplace.vue")
      }
    ]
  },
  ...filterAsyncRoutes(routes)
]);
*/

Logger.info("router", "路由配置", router)();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter(filterAsyncRoutes(routes));
  (router as any).matcher = (newRouter as any).matcher; // reset router
}

export default router;
