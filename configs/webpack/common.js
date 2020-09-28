// shared config (dev and prod)
const path = require('path');
const {resolve} = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Paths = require('../paths');

module.exports = {
 stats: {
        colors: true,
        hash: true,
        timings: true,
        chunks: false,
        chunkModules: false,
        children: false,
        modules: false,
        reasons: false,
        warnings: true,
        assets: false,
        version: false
        },

  resolve: {
    alias: {
      root: __dirname,
      src: path.resolve(__dirname, Paths.context),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  context: resolve(__dirname, Paths.context),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'source-map-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
        ],
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
    new HtmlWebpackPlugin({template: Paths.html}),
  ],
  performance: {
    hints: false,
  },
};