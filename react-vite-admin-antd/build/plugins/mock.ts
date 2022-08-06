/**
 * 模拟数据
 * https://github.com/anncwb/vite-plugin-mock
 */
 import { viteMockServe } from "vite-plugin-mock";

 function createMocks(isBuild: boolean) {
   return viteMockServe({
     ignore: /^\_/,
     mockPath: "mocks",
     localEnabled: !isBuild, // 开发
     prodEnabled: isBuild, // 生产
     watchFiles: true, // 监视文件更改
     logger: true,
     injectCode: `
        import { setupProdMockServer } from '@/mocks/_setupMock';
        setupProdMockServer();
      `,
   });
 }
 
 export default createMocks;
 