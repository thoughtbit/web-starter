/**
 * 将 SVG 文件加载为 Vue 组件.
 * https://github.com/jpkleemans/vite-svg-loader
 */
import svgLoader from "vite-svg-loader";

function createSvgLoader() {
  return svgLoader();
}

export default createSvgLoader;
