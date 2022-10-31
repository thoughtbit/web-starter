module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  plugins: ["eslint-plugin-prettier"],
  parser: "@typescript-eslint/parser",
  extends: [
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/typescript",
  ],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: "module"
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    "no-shadow": "off",
    "no-param-reassign": ["error", { props: false }],
    "no-console": "off",
    "no-plusplus": [
      "error",
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    "react/display-name": "off",
    "react/prop-types": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "import/order": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    // 关闭variable必须全部大写规则
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "variable",
        modifiers: ["const"],
        format: null,
      },
    ],
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-types": "off",
    // 统一eslint prettier配置
    "prettier/prettier": [
      "warn",
      {},
      {
        usePrettierrc: true,
      },
    ],
  }
}
