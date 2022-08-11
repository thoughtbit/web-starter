/**
 * gzip压缩
 * https://github.com/anncwb/vite-plugin-compression
 */
import compressPlugin from "vite-plugin-compression";

function createCompress(
  compress: "gzip" | "brotli" | "none",
  deleteOriginFile = false // 删除源文件
) {
  if (compress === "gzip") {
    return compressPlugin({
      ext: ".gz", // 文件类型
      threshold: 10240, // 压缩前最小文件大小
      algorithm: "gzip", // 压缩算法
      deleteOriginFile,
    });
  }

  if (compress === "brotli") {
    return compressPlugin({
      ext: ".br", // 文件类型
      algorithm: "brotliCompress", // 压缩算法
      deleteOriginFile,
    });
  }
  return compressPlugin();
}

export default createCompress;
