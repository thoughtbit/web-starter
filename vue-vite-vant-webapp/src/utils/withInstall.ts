import { getCurrentInstance } from "vue";
import type { App, Plugin } from "vue";

// 使用
// import Navbar from './navbar.vue';
// const _Navbar: WithInstallType<typeof Navbar> = withInstall(Navbar);
// export default _Navbar;
export type WithInstallType<T> = T & Plugin;
export const withInstall = <T>(comp: T): T & Plugin => {
  const c = comp as any;

  c.install = (app: App, name?: string) => {
    const defaultName = c.name;
    app.component(name || defaultName, comp);
  };

  return c as T & Plugin;
};

export default withInstall;

// 使用
// const blur = () => { searchInput.value?.blur() };
// extendAPI({ focus, blur });
export function extendAPI<T = Record<string, any>>(apis: T) {
  const instance = getCurrentInstance() as any;
  if (instance) {
    Object.assign(instance.proxy, apis);
  }
}
