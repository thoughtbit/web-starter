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
        const routePath = routesMap[rt.name];
        console.log('routePath:', routePath);
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
export const rootRoute = {
  path: "/",
  component: () => import("@/views/layouts/menu-view.vue")
};

// 公共路由
export const commonRoutes = [
  {
    ...routesConfig.login
  },
  {
    ...routesConfig.about
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
// const router = createRouter(filterAsyncRoutes(routes));

const routes = commonRoutes.concat(exceptionRoutes);
const router = createRouter(
  [
    {
      ...rootRoute,
      children: [
        {
          name: "dashboard",
          path: "/dashboard",
          component: () => import("@/views/containers/dashboard.vue")
        }
      ]
    },
    ...filterAsyncRoutes(routes)
  ]
);

console.log("路由配置:", routes, router);

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter(filterAsyncRoutes(routes));
  (router as any).matcher = (newRouter as any).matcher; // reset router
}

export default router;
