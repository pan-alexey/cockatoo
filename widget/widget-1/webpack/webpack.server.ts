import { Configuration } from "webpack";
import * as path from "path";
import webpack from "webpack";
const { ModuleFederationPlugin } = webpack.container;
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { widgetName } from './constant';

const packagePath = process.cwd();

export default (): Configuration => {
  const config: Configuration = {
    target: "node",
    mode: "development",
    devtool: 'source-map',
    entry: {
      index: path.resolve(packagePath, "./src/bootstrap.ts")
    },
    output: {
      publicPath: 'auto',
      libraryTarget: "commonjs-module",
      filename: `index.js`,
      chunkFilename: "./chunks/[name]-[contenthash].js",
      path: path.resolve(packagePath, "dist/server"),
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".css"],
      alias: {
        "~": path.resolve("src"),
      },
    },
    optimization: {
      runtimeChunk: false,
      // splitChunks: {
      //   chunks: 'all',
      //   maxInitialRequests: Infinity,
      //   minSize: 0,
      //   cacheGroups: {
      //     vendor: {
      //       test: /[\\/]node_modules[\\/]/,
      //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //       // @ts-ignore
      //       name(module) {
      //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //         // @ts-ignore
      //         const packageName = module.context.match(
      //           /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
      //         )[1];
      //         return `vendor/${packageName}`;
      //       },
      //     },
      //   },
      // },
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
                  localIdentName: `widgetName_[contenthash]`,
                },
              } 
            },
          ],
        },
      ],
    },
    plugins: [
      // new CleanWebpackPlugin(), ???
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
      new ModuleFederationPlugin({
        name: widgetName,
        library: { type: "commonjs-module" },
        filename: "module.js",
        exposes: { widget: ["./src/index"] },
        shared: [
          "react", "react-dom"
          // {
          //   react: { singleton: true },
          //   "react-dom": { singleton: true },
          //   moment: { singleton: true },
          // },
        ],
      }),
      // @ts-ignore
      new CleanWebpackPlugin()
    ],
  };

  return config;
};
