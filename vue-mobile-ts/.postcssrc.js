module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8"
      ]
    },
    "postcss-pxtorem": {
      rootValue: 50, // 换算的基数
      propList: ["*"],
      // selectorBlackList: [".van"], // 要忽略的选择器并保留为px。
      // minPixelValue: 2 // 设置要替换的最小像素值。
    }
  }
};
