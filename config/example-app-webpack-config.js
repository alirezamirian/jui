const { ProvidePlugin } = require("webpack");

/**
 * Fallback configuration for
 */
module.exports = {
  resolve: {
    fallback: {
      /**
       * Needed in example-app. Installed at top-level
       */
      crypto: require.resolve("crypto-browserify"),
      buffer: require.resolve("buffer"),
      process: require.resolve("process/browser"),
      stream: require.resolve("stream-browserify"),
      path: require.resolve("path-browserify"),
    },
  },
  plugins: [
    new ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new ProvidePlugin({
      process: "process/browser",
    }),
  ],
};
