/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'off' // 關閉未使用變量的檢查
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
