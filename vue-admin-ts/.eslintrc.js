module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    "plugin:vue/strongly-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
    "plugin:sonarjs/recommended",
  ],

  parserOptions: {
    ecmaVersion: 2020
  },

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",

    // 自定义
    "prefer-const": 1,
    "constructor-super": "error",
    "no-invalid-this": "error",
    "no-restricted-syntax": ["error", "ForInStatement"],
    "use-isnan": "error",

    // typescript-eslint
    "@typescript-eslint/ban-ts-ignore": 0,
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "args": "after-used",
        "ignoreRestSiblings": true,
        "vars": "all",
        "argsIgnorePattern": "^_"
      }
    ],
    "@typescript-eslint/no-empty-function": 0,

    // sonarts
    "sonarjs/no-collapsible-if": 1,
    "sonarjs/no-all-duplicated-branches": "error",
    "sonarjs/no-element-overwrite": "error",
    "sonarjs/no-collection-size-mischeck": "error",
    "sonarjs/no-duplicated-branches": "error",
    "sonarjs/no-identical-conditions": "error",
    "sonarjs/no-identical-expressions": "error",
    "sonarjs/cognitive-complexity": ["error", 25]
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ]
};
