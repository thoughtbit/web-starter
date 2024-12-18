import { useRouter } from "vue-router";
import type { RouteLocationNormalized, RouteRecordRaw } from "vue-router";
import { useStore } from "@/store";

export function useUser() {
  const router = useRouter();
  const { user } = useStore();
  const logout = async (logoutTo?: string) => {
    await user.logout();
    const currentRoute = router.currentRoute.value;
    router.push({
      name: logoutTo && typeof logoutTo === "string" ? logoutTo : "login",
      query: {
        ...router.currentRoute.value.query,
        redirect: currentRoute.name as string,
      },
    });
  };

  // 是否允许访问路由
  const accessRouter = (route: RouteLocationNormalized | RouteRecordRaw) => {
    return (
      !route.meta?.requiresAuth ||
      !route.meta?.roles ||
      route.meta?.roles?.includes("*") ||
      route.meta?.roles?.includes(user.role)
    );
  };

  // 找到第一个权限路由
  const findFirstPermissionRoute = (_routers: any, role = "admin") => {
    const cloneRouters = [..._routers];
    while (cloneRouters.length) {
      const firstElement = cloneRouters.shift();
      if (
        firstElement?.meta?.roles?.find((el: string[]) => {
          return el.includes("*") || el.includes(role);
        })
      )
        return { name: firstElement.name };
      if (firstElement?.children) {
        cloneRouters.push(...firstElement.children);
      }
    }
    return null;
  };
  
  // You can add any rules you want

  return {
    logout,

    // permission
    accessRouter,
    findFirstPermissionRoute,
  };
}
