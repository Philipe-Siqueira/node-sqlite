module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "no-params-reassign": "off",
    "camelcase": "off",
    "no-unused-vars": ["erros", {"argsIgnorePattern": "next"}]
  },
};
