const path = require("path");

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
    "vue/setup-compiler-macros": true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    allowImportExportEverywhere: true,
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    // Airbnb JavaScript Style Guide https://github.com/airbnb/javascript
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:vue/vue3-recommended",
    "prettier", // 接入 prettier 规则
    "plugin:prettier/recommended",
  ],
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/resolver": {
      typescript: {
        project: path.resolve(__dirname, "./tsconfig.json"),
      },
    },
  },
  rules: {
    // 启 prettier 自动修复的功能
    "prettier/prettier": 1,

    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",

    // Vue: Recommended rules to be closed or modify
    "vue/no-deprecated-html-element-is": 0,
    "vue/no-multiple-template-root": 0,
    "vue/require-default-prop": 0,
    "vue/singleline-html-element-content-newline": 0,
    "vue/max-attributes-per-line": 0,
    // Vue: Add extra rules
    "vue/custom-event-name-casing": [2, "camelCase"],
    "vue/no-v-text": 1,
    "vue/padding-line-between-blocks": 1,
    "vue/require-direct-export": 1,
    "vue/multi-word-component-names": 0,
    "vue/component-definition-name-casing": 0,

    // typescript-eslint
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/ban-types": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/promise-function-async": 0,
    "@typescript-eslint/strict-boolean-expressions": 0,
    "import/extensions": [
      2,
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/prefer-default-export": 0,
    "no-undef": 0,
    "no-unused-vars": 0,
    "no-param-reassign": 0,
    "prefer-regex-literals": 0,
    "import/no-unresolved": 0,
    "import/no-extraneous-dependencies": 0,
    "comma-dangle": [0, "always-multiline"],
    "func-call-spacing": 0,
  },
};
