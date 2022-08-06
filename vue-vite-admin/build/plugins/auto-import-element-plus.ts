/**
 * 修复 unplugin-vue-components自动按需引入, 首次启动服务会依赖预构建style
 * https://github.com/antfu/unplugin-vue-components/issues/361
 */
import type { Plugin } from "vite";

function createAutoImportElementPlus() {
  return {
    name: "auto-import-element-plus",
    transform(code, id) {
      if (/src\/main.ts$/.test(id)) {
        return {
          code: `
            ${code};
            import ElementPlus from "element-plus";
            import "element-plus/dist/index.css";
            app.use(ElementPlus);
          `,
          map: null,
        };
      }
    },
  } as Plugin;
}

export default createAutoImportElementPlus;
