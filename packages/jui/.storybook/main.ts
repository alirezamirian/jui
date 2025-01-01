import { dirname, join } from "path";
import { Configuration, ProvidePlugin } from "webpack";
// @ts-expect-error noImplicitAny
import CircularDependencyPlugin from "circular-dependency-plugin";
// @ts-expect-error noImplicitAny
import alias from "../../../config/lib-src-webpack-alias";
import { StorybookConfig } from "@storybook/react-webpack5";

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("storybook-addon-theme-provider"),
    getAbsolutePath("@storybook/addon-webpack5-compiler-swc"),
    "@chromatic-com/storybook",
  ],
  swc: () => ({
    jsc: {
      experimental: {
        plugins: [
          // FIXME: retry adding these plugins after upgrading react and/or storybook
          // ["@swc-jotai/react-refresh", {}],
          // ["@swc-jotai/debug-label", {}],
        ],
      },
      parser: {
        syntax: "typescript",
        tsx: true,
        dynamicImport: true,
        decorators: true,
      },
    },
  }),
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
