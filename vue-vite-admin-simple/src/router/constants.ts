export const Layout = () => import("@/layouts/default-layout.vue");
export const BlankLayout = () => import("@/layouts/blank-layout.vue");
export const PageLayout = () => import("@/layouts/page-layout.vue");
export const ParentView = () => import("@/layouts/components/parent-view.vue");
export const PageIframe = () => import("@/layouts/components/page-iframe.vue");
export const ExceptionComponent = () => import("@/pages/result/500.vue");
export const ParentLayout = () =>
  new Promise((resolve) => {
    resolve({ name: "ParentLayout" });
  });
export const EmptyLayout = () =>
  new Promise((resolve) => {
    resolve({ name: "EmptyLayout" });
  });
