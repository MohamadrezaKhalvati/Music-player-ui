const { resolve } = require("path");
module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,

  // https://eslint.vuejs.org/user-guide/#how-to-use-custom-parser
  // Must use parserOptions instead of "parser" to allow vue-eslint-parser to keep working
  // `parser: 'vue-eslint-parser'` is already included with any 'plugin:vue/**' config and should be omitted
  parserOptions: {
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser#configuration
    // https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#eslint
    // Needed to make the parser take into account 'vue' files
    parser: "@typescript-eslint/parser",
    project: resolve(__dirname, "./tsconfig.json"),
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },

  env: {
    browser: true,
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    // Base ESLint recommended rules
    // 'eslint:recommended',
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
    // ESLint typescript rules
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    // consider disabling this class of rules if linting takes too long
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],

  plugins: [
    // required to apply rules which need type information
    "@typescript-eslint",
  ],

  globals: {
    process: true,
  },

  // add your custom rules here
  rules: {
    "no-param-reassign": "off",
    // TypeScript
    quotes: [1, "double"],
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-misused-promises": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/camelcase": 1,
    "@typescript-eslint/no-namespace": 0,
    "@typescript-eslint/no-use-before-define": ["error", { functions: false }],
    "@typescript-eslint/unbound-method": ["error", { functions: true }],
  },
};
