import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import legacy from "@vitejs/plugin-legacy";
import mock from "./plugins/mock";
import svgIcon from "./plugins/svg-icon";

function createVitePlugins(viteEev: Record<string, string>, isBuild = false) {
  // console.log("viteEev:", viteEev);
  // console.log("isBuild:", isBuild);

  return [
    vue(),
    vueJsx(),
    legacy({
      targets: ["ie >= 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
    svgIcon(isBuild),
    mock(isBuild),
  ];
}

export default createVitePlugins;
