const baseConfig = require('../.eslintrc.base.js');

module.exports = {
  ...baseConfig,
  env: {
    node: true,
    browser: false,
    jest: true,
  },
  rules: {
    ...baseConfig.rules,
  },
};
