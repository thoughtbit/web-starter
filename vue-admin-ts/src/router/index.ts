import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { routesConfig, routesMap } from "@/router/routes.config";

Vue.use(VueRouter);

export function filterAsyncRoutes (routes: RouteConfig[]) {
  let routeList: RouteConfig[] = [];
  const loop = ({routes, parentPath = "/"}: { routes: any, parentPath?: string }) => {
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
        const routePath = routesMap[rt.name.toLowerCase()];
        if (routePath) {
          rt.component = () =>  import(`@/${routePath}.vue`);
        }
        if (children instanceof Array && children.length) {
          const subMenus = children.filter(c => c.menuType !== 2);
          if (subMenus.length) rt.redirect = subMenus[0].path;
        }
        routeList.push(rt);
        if (children) {
          loop({routes: children, parentPath: (rt.hidden ? parentPath : rt.path)});
        }
      });
    }
  };
  loop({routes: routes});
  return routeList;
}

// 根路由
export const rootRoute = [
  {
    component: () => import(/* webpackChunkName: "layout" */ "@/views/layouts/layout.vue"),
    ...routesConfig.index
  }
];

// 公共路由
export const commonRoutes = [
  {
    ...routesConfig.index
  },
  {
    ...routesConfig.login
  }
];

// 错误和异常路由
export const exceptionRoutes = [
  {
    ...routesConfig.unauthorized
  },
  {
    ...routesConfig.notFound
  },
  {
    ...routesConfig.error
  }
];

// 路由实例化
export const createRouter = (routes: RouteConfig[]) =>{
  return new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    linkActiveClass: "is-active",
    scrollBehavior: (to, from, savedPosition) => {
      if (to.hash) {
        return {
          selector: to.hash
        };
      } else if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
    routes
  });
};

// const routes = store.getters.routes.length ? store.getters.routes : commonRoutes
const routes = commonRoutes;
const router = createRouter(filterAsyncRoutes(routes));
console.log("路由配置:", routes, filterAsyncRoutes(routes));

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter(filterAsyncRoutes(routes));
  (router as any).matcher = (newRouter as any).matcher; // reset router
}

export default router;
