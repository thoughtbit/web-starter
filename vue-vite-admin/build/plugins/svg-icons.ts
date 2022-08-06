/**
 * 用于生成 svg 雪碧图.
 * https://github.com/vbenjs/vite-plugin-svg-icons
 */

import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { resolve } from "path";

function createSvgIcons(isBuild: boolean) {
  return createSvgIconsPlugin({
    iconDirs: [resolve(__dirname, "../../src/assets/icons/svgs")],
    symbolId: "icon-[dir]-[name]",
    // 'body-last' | 'body-first'
    inject: "body-first",
    svgoOptions: isBuild,
  });
}

export default createSvgIcons;
