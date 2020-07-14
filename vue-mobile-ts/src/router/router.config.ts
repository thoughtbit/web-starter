import Main from "@/views/main.vue"

export const routesConfig = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import(/* webpackChunkName: "register" */ "@/views/register.vue"),
  }
];
