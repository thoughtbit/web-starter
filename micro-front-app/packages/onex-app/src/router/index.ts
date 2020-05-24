import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  // {
  //   name: "Layout",
  //   path: "/",
  //   component: () => import(/* webpackChunkName: "layout" */ '@/layouts/layout.vue')
  // },
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/home.vue")
  },
  {
    path: "/login",
    name: "Login",
    meta: { withoutLayout: true },
    component: () => import(/* webpackChunkName: "about" */ "@/views/login.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
