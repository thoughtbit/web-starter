/**
 * If you use the template method for development, you can use the unplugin-vue-components plugin to enable on-demand loading support.
 * 自动按需引入
 * https://github.com/antfu/vite-plugin-components
 */
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default function configElementPlusResolverPlugin() {
  const elementPlusResolverPlugin = Components({
    // relative paths to the directory to search for components.
    dirs: ["src/components", "src/pages/**/components"],
    // allow auto load markdown components under `./src/components/`
    extensions: ["vue", "tsx", "ts"],
    // allow auto import and register components used in markdown
    include: [/\.vue$/, /\.vue\?vue/, /\.ts$/, /\.tsx$/, /\.md$/],
    resolvers: [
      ElementPlusResolver({
        importStyle: "sass",
      }),
    ],
    dts: "src/components.d.ts",
  });
  return elementPlusResolverPlugin;
}
