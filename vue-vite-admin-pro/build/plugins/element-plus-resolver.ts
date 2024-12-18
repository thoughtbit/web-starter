/**
 * 自动按需引入, 虽然此项目中是全量引入组件，但此插件会默认使用。
 * https://github.com/antfu/vite-plugin-components
 */
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

function createElementPlusResolver() {
  return Components({
    // relative paths to the directory to search for components.
    dirs: [], // 避免解析到src/components
    // allow auto load markdown components under `./src/components/`
    extensions: ["vue", "tsx", "ts"],
    // allow auto import and register components used in markdown
    include: [/\.vue$/, /\.vue\?vue/, /\.ts$/, /\.tsx$/, /\.md$/],
    resolvers: [
      ElementPlusResolver({
        importStyle: "sass",
      }),
    ],
    dts: false,
    // dts: "src/components.d.ts",
  });
}

export default createElementPlusResolver;
