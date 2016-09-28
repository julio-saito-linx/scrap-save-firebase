const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const DashboardPlugin = require('webpack-dashboard/plugin');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter((x) => {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach((mod) => {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: path.resolve('src', 'index.js'),
  target: 'node',
  output: {
    path: path.resolve('build'),
    filename: 'bundle.js'
  },
  externals: nodeModules,
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-0'],
        plugins: [
          ['module-alias', [
            { 'src': 'src', 'expose': '~' },
          ]],
        ],
      }
    }]
  },
  plugins: [
    new DashboardPlugin(),
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin('require("source-map-support").install();',
                             { raw: true, entryOnly: false })
  ],
  devtool: 'sourcemap'
};

