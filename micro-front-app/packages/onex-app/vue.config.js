const path = require("path");
const pkg = require("./package.json");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 9000;
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/client/" : "/",
  // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
  outputDir: "dist",
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  // assetsDir: 'static',
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: process.env.NODE_ENV === "development",
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: !isProduction,
  parallel: require("os").cpus().length > 1,
  devServer: {
    // host: "0.0.0.0",
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true
    },
    open: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  configureWebpack(config) {
    const plugins = [];
    config.name = pkg.name;
    config.resolve.alias["@"] = resolve("src");
  }
};
