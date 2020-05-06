import router, { createRouter } from "@/router";
import store from "@/store";
import { SET_LOGIN_STATUS, SET_TOKEN } from "@/store/mutation-types";
import StorageManager from "@/utils/storage-manager";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  showSpinner: false
});

async function authStatusCheck(cb: (authCheck: boolean) => void) {
  const token = StorageManager.getToken();
  if (!!token) {
    await store.commit(`auth/${SET_TOKEN}`, token);
    await store.dispatch("auth/getUser").then((result) => {
      if (!result) {
        store.commit(`auth/${SET_LOGIN_STATUS}`, false);
        cb(false);
      } else {
        store.commit(`auth/${SET_LOGIN_STATUS}`, true);
        cb(true);
      }
    });
  } else {
    store.commit(`auth/${SET_LOGIN_STATUS}`, false);
    cb(false);
  }
}

const whiteList = ["/login", "/register"];

router.beforeEach(async (to, from, next) => {
  // console.log("路由切换：", from.path, "===>", to.path);
  NProgress.start();

  // 当前路由
  await store.dispatch("permission/currentRoute", {
    to,
    from
  });

  // Token 是否合法
  await authStatusCheck( (authCheck) => {
    // 如果有Token
    if (authCheck) {
      if (to.path === "/login") {
        // 如果登录过重定向到首页
        next({ path: "/" })
        NProgress.done();
      } else {
        // 当进入非登录页时，需要进行权限校验
        const addRoutes = store.getters.addRoutes;
        // console.log(addRoutes.length, store.getters.routes)
        if (addRoutes.length === 0) {
          store.dispatch("permission/generateRoutes").then((routes) => {
            // console.log("动态加载路由");
            if (routes instanceof Array && routes.length) {
              router.match = createRouter(routes).match;
              router.addRoutes(routes); // 动态添加可访问路由表
              // @ts-ignore
              next({ ...to });
            } else {
              console.log("路由获取失败");
            }
          });
        } else {
          // console.log('已加载过动态路由')
          if (to.path === "/") {
            next({
              path: "/dashboard",
              replace: true
            });
          } else {
            if (store.state.permission.openTarget.includes(<string>to.name) && from.name && from.name !== to.name) {
              window.open(`/#${to.path}`);
            } else {
              next();
            }
          }
          NProgress.done();
        }
      }
    } else {
      // 在免登录白名单，直接进入
      if (whiteList.indexOf(to.path) !== -1) {
        next();
        NProgress.done();
      } else {
        next(`/login?redirect=${to.fullPath}`);
        NProgress.done();
      }
    }
  });
});

router.afterEach((to) => {
  NProgress.done();
});
