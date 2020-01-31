module.exports = {
  env: {
    browser: true,
    es6: true,
    mocha: true, // for test files
    "truffle/globals": true // same as "truffle/truffle": true
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
  },
  plugins: [
    "truffle",
  ]
};
