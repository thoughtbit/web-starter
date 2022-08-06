import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

// @ts-ignore
const modules = import.meta.glob("./**/*.ts", { eager: true });
// console.log("modules:", modules);

const mockModules: any[] = [];
Object.keys(modules).forEach((key) => {
  if (key.includes("/_")) {
    return;
  }
  mockModules.push(...modules[key].default);
});

/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
