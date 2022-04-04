/**
 * Mock plugin for development and production.
 * 模拟数据
 * https://github.com/anncwb/vite-plugin-mock
 */
import { viteMockServe } from "vite-plugin-mock";

export default function configMockPlugin(isBuild: boolean) {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: "mocks",
    localEnabled: !isBuild, // 开发
    prodEnabled: isBuild, // 生产
    watchFiles: true, // 监视文件更改
    injectCode: `
      import { setupProdMockServer } from './../mocks/_setupMock';
      setupProdMockServer();
    `,
  });
}
