import { Configuration } from "webpack";
import * as path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import webpack from "webpack";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const { ModuleFederationPlugin } = webpack.container;
import { isPackage } from "./webpack/package";
// webpack configs

import { name, version } from './package.json';
const packageName = name.replace('@vexa/','');
const widgetName = `${packageName}~${version}`;

export default (): Configuration => {
  const config: Configuration = {
    entry: {
      index: path.resolve(__dirname, "./src/Widget.tsx"),
    },
    target: "node",
    mode: "production",
    output: {
      chunkLoadingGlobal: "webpack_widget_chunks",
      uniqueName: widgetName,
      publicPath: "auto",
      libraryTarget: "commonjs-module",
      path: path.resolve(__dirname, "dist/server"),
      filename: `widget.js`,
      chunkFilename: "widget.chunks.js",
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".css"],
      alias: {
        "~": path.resolve("src"),
      },
    },
    optimization: {
      runtimeChunk: false,
      splitChunks: {
        cacheGroups: {
          default: false
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            exclude: /node_modules/,
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
        {
          test: /\.css$/i,
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: {
                  exportOnlyLocals: true,
                  auto: true,
                  localIdentName: `${packageName}_[contenthash]`,
                },
              } 
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
      new ModuleFederationPlugin({
        name: widgetName,
        library: { type: "commonjs-module" },
        filename: "widget.module.js",
        exposes: { widget: ["./src/Widget"] },
        shared: [
          {
            react: { singleton: true },
            "react-dom": { singleton: true },
            moment: { singleton: true },
          },
        ],
      }),
    ],
  };

  return config;
};
