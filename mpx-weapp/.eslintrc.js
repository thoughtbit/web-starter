module.exports = {
  extends: ['@mpxjs'],
  rules: {
    // .mpx文件规则 https://mpx-ecology.github.io/eslint-plugin-mpx/rules/
  },
  overrides: [
    {
      files: ['**/*.ts'],
      rules: {
        // .ts文件规则 https://typescript-eslint.io/rules/
        "space-before-function-paren": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "semi": 0,
        "comma-dangle": 0,
        "@typescript-eslint/ban-types": 0,
        "@typescript-eslint/no-inferrable-types": 0,
        "prefer-promise-reject-errors": 0,
        "dot-notation": 0,
        "quotes": 0,
      }
    },
    {
      files: ['**/*.js'],
      rules: {
        // .js文件规则 https://eslint.bootcss.com/docs/rules/
        "space-before-function-paren": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "semi": 0,
        "comma-dangle": 0,
        "@typescript-eslint/ban-types": 0,
        "prefer-promise-reject-errors": 0,
        "dot-notation": 0,
        "quotes": 0,
      }
    }
  ]
}
