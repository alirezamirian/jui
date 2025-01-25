const libSrcAlias = require("../../../config/lib-src-webpack-alias");
import { Configuration, ProvidePlugin } from "webpack";
/**
 * This is needed for cypress component testing.
 *
 * **NOTE**: Using react-scripts was first tested to avoid maintaining webpack config here, but there was an issue in
 * using importing from .storybook/preview, caused by a webpack plugin added by react-script's webpack config, which
 * requires all imports to be from src.
 *
 * **NOTE**: There are some transitive dependencies used here like style-loader, css-loader and ts-loader. We may need
 * to change this. Also some peer dependencies of @cypress/webpack-dev-server are missing at the moment but are somehow
 * provided, and therefore ignored!
 *
 */
export default {
  mode: "development",
  devtool: "inline-cheap-source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      ...libSrcAlias,
    },
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      path: require.resolve("path-browserify"),
      stream: require.resolve("stream-browserify"),
      process: require.resolve("process/browser"),
    },
  },
  plugins: [
    new ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "ts-loader",
            options: {
              // skip typechecking for speed
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  ignoreWarnings: [
    // @storybook/react imports @storybook/test which is its optional peer dependency.
    // Webpack doesn't handle it well. Upgrading to >=5.90.2 didn't work.
    // https://github.com/webpack/webpack/discussions/18027#discussioncomment-10073944
    // https://github.com/webpack/webpack/issues/7713
    (e) => e.message.includes("Can't resolve '@storybook/test'"),
  ],
} as Configuration;
