module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'react-app',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx', '.tsx'] }],
    
    'import/prefer-default-export': 0,
    'import/no-commonjs': 0,
    'semi-spacing': [2, { 'before': false, 'after': true }]
  },
};
