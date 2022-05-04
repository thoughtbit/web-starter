import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

function createSvgIcon(isBuild: boolean) {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons/svgs")],
    symbolId: "icon-[dir]-[name]",
    // 'body-last' | 'body-first'
    inject: "body-first",
    svgoOptions: isBuild,
  });
}

export default createSvgIcon;
