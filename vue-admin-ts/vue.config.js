const path = require("path");

const devServerPort = 4000;
const name = "大数据统一管理平台";

module.exports = {
  pwa: {
    name
  },

  publicPath: process.env.NODE_ENV === "production" ? "/clinet/" : "/",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,

  css: {
    sourceMap: true
  },

  devServer: {
    port: devServerPort,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_API_HOST,
        changeOrigin: true, // needed for virtual hosted sites
        // ws: true, // proxy websockets
        // autoRewrite: true,
        // cookieDomainRewrite: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_BASE_API}`]: ""
        }
      }
    }
  },
  chainWebpack(config) {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set("name", name);

    config.when(process.env.NODE_ENV === "development", (config) => config.devtool("source-map"));

    // https://webpack.js.org/configuration/devtool/#development
    config.when(process.env.NODE_ENV !== "development", (config) => config.devtool("cheap-source-map"));
    config.when(process.env.NODE_ENV !== "development", (config) => {
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          vendors: {
            name: "chunk-vendors",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial" // only package third parties that are initially dependent
          },
          commons: {
            name: "chunk-commons",
            test: path.resolve(__dirname, "src/components"),
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      config.optimization.runtimeChunk("single");
    });

    // 忽略的打包文件
    config.externals({
      // vue: "Vue",
      // "vue-router": "VueRouter",
      // vuex: "Vuex",
      // axios: "axios",
      // "element-ui": "ELEMENT",
      // "echarts/lib/echarts": "echarts",
      // // lodash: '_',
      //  moment: "moment",
      // "crypto-js": "CryptoJS",
      // jquery: "jQuery",
    });

    // svg 图片精灵
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "[name]"
      });
  },
  // node_modules依赖项es6语法未转换问题
  transpileDependencies: ["vuex-module-decorators", "resize-detector"]
};
