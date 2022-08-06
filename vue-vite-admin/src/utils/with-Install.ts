import type { App, Component, Plugin } from "vue";

export type PluginInstallFunction = {
  install(app: App): unknown;
};
export type WithInstallType<T> = T & Plugin;

/**
 * 使用
 * import Navbar from './navbar.vue';
 * const _Navbar: WithInstallType<typeof Navbar> = withInstall(Navbar);
 * export default _Navbar;
 */
export function withInstall<T extends Component>(comp: T): T & PluginInstallFunction {
  const plugin: Plugin = comp as Plugin;

  plugin.install = (app: App) => {
    const { name } = comp as Component;
    app.component(name as string, comp);
  };

  return comp as T & PluginInstallFunction;
}
