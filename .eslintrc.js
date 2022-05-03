module.exports = {
    root: true,
    env: {
      browser: true,
      node: true,
    },
    extends: ['@nuxtjs/eslint-config-typescript', 'plugin:nuxt/recommended', 'prettier'],
    plugins: ['@babel'],
    rules: {
      '@babel/new-cap': 'error',
      '@babel/no-invalid-this': 'error',
      '@babel/no-unused-expressions': 'error',
      '@babel/object-curly-spacing': 'error',
      '@babel/semi': 'error',
    },
  };