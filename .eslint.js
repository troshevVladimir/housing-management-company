module.exports = {
  root: true,
  env: {
    browser: true,
  },
  // plugins: ["@typescript-eslint"], //
  extends: [
    // "@typescript-eslint",
    "plugin:vue/vue3-essential",
    "@vue/eslint-config-prettier",
    "eslint:recommended",
  ],
  parserOptions: {
    parser: "babel-eslint",
    // parser: "@typescript-eslint/parser",//
  },
};
