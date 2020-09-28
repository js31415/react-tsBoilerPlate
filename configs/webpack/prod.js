// production config
const merge = require('webpack-merge');
const {resolve} = require('path');
const Paths = require('../paths');

const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: Paths.src,
  optimization: {
    runtimeChunk: 'single',
    removeAvailableModules: true,
    removeEmptyChunks: true,
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `vendor.${packageName.replace('@', '')}`;
          },
        }
      }
    }
  },
  output: {
    filename: 'js/bundle.[hash].min.js',
    path: resolve(__dirname, Paths.dist),
    publicPath: '/',
  },
  devtool: 'source-map',
  plugins: [],
});