const libSrcAlias = require("../../../config/lib-src-webpack-alias");
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
 * @type webpack.Configuration
 */
export default {
  mode: "development",
  devtool: "inline-cheap-source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      ...libSrcAlias,
    },
  },
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
};
