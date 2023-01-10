const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const sharedWebpackConfig = require("./webpack.shared");
const moduleFederationPlugin = require("./module-federation");

module.exports = merge(sharedWebpackConfig, {
  output: {
    path: path.resolve(__dirname, "../dist/server"),
    filename: "[name].js",
    libraryTarget: "commonjs-module",
  },
  target: 'node',
  plugins: [
    ...moduleFederationPlugin.server,
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'IS_SERVER': JSON.stringify(true),
    }),
  ],
});
