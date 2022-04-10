module.exports = {
  extends: [
    // standard 规则集合
    "stylelint-config-standard",
    // standard 规则集合的 scss 版本
    "stylelint-config-standard-scss",
    // 样式属性顺序规则
    "stylelint-config-rational-order",
    // 接入 Prettier 规则
    "stylelint-config-prettier",
    "stylelint-prettier/recommended",
  ],
  defaultSeverity: "warning",
  plugins: ["stylelint-order", "stylelint-prettier"],
  rules: {
    // 开启 Prettier 自动格式化功能
    "prettier/prettier": true,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["plugin"],
      },
    ],
    "rule-empty-line-before": [
      "always",
      {
        except: ["after-single-line-comment", "first-nested"],
      },
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["deep"],
      },
    ],
  },
};
