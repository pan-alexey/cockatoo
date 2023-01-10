const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const sharedWebpackConfig = require("./webpack.shared");
const moduleFederationPlugin = require("./module-federation");

function normalizeName(name) {
  return name.replace(/node_modules/g, "nodemodules").replace(/[\-_.|]+/g, " ")
    .replace(/\b(vendors|nodemodules|js|modules|es)\b/g, "")
    .trim().replace(/ +/g, ".");
}

module.exports = merge(sharedWebpackConfig, {
  output: {
    path: path.resolve(__dirname, "../dist/server"),
    filename: "[name].js",
    libraryTarget: "commonjs-module",
    chunkFilename: (pathData) => {
      return `chunk/${normalizeName(pathData.chunk.id)}.[contenthash].js`;
    },
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
