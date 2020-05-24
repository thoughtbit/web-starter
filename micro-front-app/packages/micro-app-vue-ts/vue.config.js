const path = require("path");
const pkg = require("./package.json");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 9001;

module.exports = {
  parallel: require("os").cpus().length > 1,
  filenameHashing: true,
  devServer: {
    // host: "0.0.0.0",
    hot: true,
    historyApiFallback: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    // proxy: {
    //   [process.env.VUE_APP_BASE_API_PREFIX]: {
    //     target: process.env.VUE_APP_BASE_API,
    //     changeOrigin: true, // needed for virtual hosted sites
    //     // ws: true, // proxy websockets
    //     autoRewrite: true,
    //     // cookieDomainRewrite: true,
    //     pathRewrite: {
    //       [`^${process.env.VUE_APP_BASE_API_PREFIX}`]: ""
    //     }
    //   }
    // }
  },
  configureWebpack: {
    name: pkg.name,
    resolve: {
      alias: {
        "@": resolve("src")
      }
    },
    output: {
      library: `${pkg.name}-[name]`,
      jsonpFunction: `webpackJsonp_${pkg.name}`,
      filename: "[name].[hash:8].js",
      libraryTarget: "umd",
      globalObject: "this"
    }
  }
};
