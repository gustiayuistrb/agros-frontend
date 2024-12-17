const { override, addWebpackAlias, addWebpackPlugin } = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
  config => {
    config.resolve.fallback = {
      process: require.resolve('process/browser.js'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer')
    };

    config.plugins = [
      ...config.plugins,
      new webpack.ProvidePlugin({
        process: 'process/browser.js'
      })
    ];

    return config;
  }
);
