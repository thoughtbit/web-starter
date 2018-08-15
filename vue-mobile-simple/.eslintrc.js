// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // 自定义
    'max-len': 0,
    'import/prefer-default-export': 0,
    'prefer-const': 0,
    'func-names': 0,
    'no-else-return': 0,
    'no-bitwise': 0,
    'guard-for-in': 0,
    'no-restricted-syntax': 0,
    'import/no-mutable-exports': 0,
    'consistent-return': 0,
    'no-unused-vars': 0,
    'no-unused-expressions': 0,
    'no-console': 0,
    'no-shadow': 0,
    'no-alert': 0,
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'no-useless-escape': 0,
    'dot-notation': 0,
    'arrow-body-style': 0,
    'linebreak-style': 'off',


    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
