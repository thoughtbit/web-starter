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
  },
  {
    path: "/setting",
    name: "setting",
    component: () => import(/* webpackChunkName: "setting" */ "@/views/setting.vue"),
  },
  {
    path: "/message",
    name: "message",
    component: () => import(/* webpackChunkName: "message" */ "@/views/message.vue"),
  }
];
