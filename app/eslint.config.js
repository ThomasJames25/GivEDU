// eslint.config.js
module.exports = {
    extends: ['eslint:recommended'],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    env: {
      node: true,
      browser: true,
    },
    rules: {
      // Add your custom rules here if needed
    },
  };