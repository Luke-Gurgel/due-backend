module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    node: true,
    "jest/globals": true
  },
  plugins: ['@typescript-eslint', 'jest'],
  extends: [
    "plugin:jest/recommended",
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    plugins: ['typescript']
  },
  rules: {
    "space-before-function-paren": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "no-unexpected-multiline": 'error'
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["src", "./src/"],
          ["__tests__", "./__tests__/"]
        ],
        extensions: [".js", ".ts", ".json"]
      }
    }
  }
}
