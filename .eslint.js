module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "@vue/eslint-config-prettier",
    "eslint:recommended",
  ],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {},
};
