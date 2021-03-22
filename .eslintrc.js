module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: ["@react-native-community"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules:{},
};
