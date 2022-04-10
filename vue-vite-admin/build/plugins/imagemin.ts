/**
 * Image resource files used to compress the output of the production environment
 * 图片压缩
 * https://github.com/anncwb/vite-plugin-imagemin
 */
import viteImagemin from "vite-plugin-imagemin";

export default function configImageminPlugin() {
  const imageminPlugin = viteImagemin({
    gifsicle: {
      optimizationLevel: 7,
      interlaced: false,
    },
    // 无损压缩配置，无损压缩下图片质量不会变差
    optipng: {
      optimizationLevel: 7,
    },
    mozjpeg: {
      quality: 20,
    },
    // 有损压缩配置，有损压缩下图片质量可能会变差
    pngquant: {
      quality: [0.8, 0.9],
      speed: 4,
    },
    // svg 优化
    svgo: {
      plugins: [
        {
          name: "removeViewBox",
        },
        {
          name: "removeEmptyAttrs",
          active: false,
        },
      ],
    },
  });
  return imageminPlugin;
}
