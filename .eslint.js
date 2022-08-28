module.exports = {
  root: true,
  env: {
    browser: true,
  },
  // plugins: ["@typescript-eslint"], //
  extends: [
    "@typescript-eslint",
    "plugin:vue/vue3-essential",
    "plugin:prettier/recommended",
    "eslint:recommended",
  ],
  parserOptions: {
    parser: "babel-eslint",
    // parser: "@typescript-eslint/parser",//
  },
  'rules': {
    'quotes': ['error', 'single'],
    // we want to force semicolons
    'semi': ['error', 'always'],
    // we use 2 spaces to indent our code
    'indent': ['error', 2],
    // we want to avoid extraneous spaces
    'no-multi-spaces': ['error']
  }
};
