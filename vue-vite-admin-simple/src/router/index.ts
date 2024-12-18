import type { App } from "vue";
import { createRouter } from "vue-router";
import { routerConfig } from "./router-config";
import { createRouterGuard } from "./router-guard";

const router = createRouter(routerConfig);

export async function setupRouter(app: App) {
  // 挂载路由守卫
  createRouterGuard(router);

  // 挂载路由
  app.use(router)
  await router.isReady()
}

export default router;
