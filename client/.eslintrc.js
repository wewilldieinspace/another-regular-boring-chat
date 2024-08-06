const baseConfig = require('../.eslintrc.base.js');

module.exports = {
  ...baseConfig,
  env: {
    browser: true,
    node: false,
    jest: true,
  },
  rules: {
    ...baseConfig.rules,
  },
};
