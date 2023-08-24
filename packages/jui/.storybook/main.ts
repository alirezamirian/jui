import { dirname, join } from "path";
import { Configuration, ProvidePlugin } from "webpack";
// @ts-expect-error noImplicitAny
import CircularDependencyPlugin from "circular-dependency-plugin";
// @ts-expect-error noImplicitAny
import alias from "../../../config/lib-src-webpack-alias";

module.exports = {
  stories: [
    // Now that we ended up having all stories defined in ../packages/jui/src, we can even move back storybook
    // configuration and deps to packages/jui, and it would work just fine. But on the other hand, it kind of
    // belongs here
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("storybook-addon-theme-provider"),
  ],

  webpackFinal: async (config: Configuration) => {
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
      ...config.resolve.fallback,
      buffer: require.resolve("buffer"),
      process: require.resolve("process/browser"),
      stream: require.resolve("stream-browserify"),
      path: require.resolve("path-browserify"),
    };
    config.resolve.alias = {
      ...config.resolve.alias,
      ...alias,
    };
    config.plugins?.push(
      new CircularDependencyPlugin({
        exclude: /node_modules/,
        include: /jui/,
        failOnError: false,
      }),
      new ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
      new ProvidePlugin({
        process: "process/browser",
      })
    );
    return config;
  },

  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {},
  },

  docs: {
    autodocs: false,
  },
};

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
