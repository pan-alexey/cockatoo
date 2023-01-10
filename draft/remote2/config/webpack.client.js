const path = require("path");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const sharedWebpackConfig = require("./webpack.shared");
const moduleFederationPlugin = require("./module-federation");
const HtmlWebPackPlugin = require("html-webpack-plugin");

function normalizeName(name) {
  return name.replace(/node_modules/g, "nodemodules").replace(/[\-_.|]+/g, " ")
    .replace(/\b(vendors|nodemodules|js|modules|es)\b/g, "")
    .trim().replace(/ +/g, ".");
}

module.exports = merge(sharedWebpackConfig, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../dist/client"),
    publicPath: "auto",
    chunkFilename: (pathData) => {
      return `chunk/${normalizeName(pathData.chunk.id)}.[contenthash].js`;
    },
  },
  target: 'web',
  plugins: [
    moduleFederationPlugin.client,
    new CleanWebpackPlugin(),
  ],
});
