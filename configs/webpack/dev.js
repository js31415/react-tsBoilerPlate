// development config
const merge = require('webpack-merge');
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const webpack = require('webpack');
const commonConfig = require('./common');
const Paths = require('../paths');

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: [
    'react-hot-loader/patch', // activate HMR for React
    'webpack-dev-server/client?http://localhost:8080',// bundle the client for webpack-dev-server and connect to the provided endpoint
    'webpack/hot/only-dev-server', // bundle the client for hot reloading, only- means to only hot reload for successful updates
    Paths.src // the entry point of our app
  ],
  devServer: {
    hot: true, // enable HMR on the server
    historyApiFallback: true,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      children: false,
      modules: false,
      reasons: false,
      warnings: true,
      assets: false,
      version: false
    }
  },

  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: true,
  },

  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new ProgressBarPlugin(),
  ],
});