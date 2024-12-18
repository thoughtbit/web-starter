/**
 * 生成打包分析
 * https://github.com/btd/rollup-plugin-visualizer
 */
import visualizer from "rollup-plugin-visualizer";

function createVisualizer() {
  if (process.env.REPORT === 'true') {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    });
  }
  return [];
}

export default createVisualizer;
