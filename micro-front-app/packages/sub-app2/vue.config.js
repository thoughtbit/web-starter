const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 9002;
const name = "sub-app2";

module.exports = {
  devServer: {
    // host: "0.0.0.0",
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        "@": resolve("src")
      }
    },
    output: {
      library: "subapp2",
      filename: "[name].[hash:8].js",
      libraryTarget: "umd",
      globalObject: "this"
    }
  }
};
