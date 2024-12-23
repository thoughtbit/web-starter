// 格式化模块
export function formatModules(_modules: any, result: any[] = []) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default;
    if (!defaultModule) return;
    const moduleList = Array.isArray(defaultModule) ? [...defaultModule] : [defaultModule];
    result.push(...moduleList);
  });
  return result;
}

/**
// 使用
const modules = import.meta.glob("./modules/*.tsx", { eager: true });
const appRouters = formatModules(modules, []);
*/
