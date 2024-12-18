import type { App } from "vue";
import { createRouter } from "vue-router";
import { routerConfig } from "./router-config";
import { createRouterGuard } from "./router-guard";

const router = createRouter(routerConfig);

export async function setupRouter(app: App<Element>) {
  // 挂载路由
  app.use(router);

  // 挂载路由守卫
  createRouterGuard(router);

  // Mount when the route is ready
  // https://next.router.vuejs.org/api/#isready
  await router.isReady();
}

export default router;
