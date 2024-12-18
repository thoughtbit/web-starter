import type { App } from "vue";

export default (app: App) => {
  register(app, import.meta.glob("./directives/*.ts"));
};

function register(app: App, modules: Record<string, any>) {
  Object.entries(modules).map(([file, module]) => {
    const name = file.match(/^\.\/(.*)*\//)?.[1] as string;
    app.directive(name, module.default);
  });
}
