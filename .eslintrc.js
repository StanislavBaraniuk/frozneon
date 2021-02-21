module.exports = {
  parser: "vue-eslint-parser",
  root: true,
  env: {
    es6: true,
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    // 'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
  }
};
