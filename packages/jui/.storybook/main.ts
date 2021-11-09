import { Configuration } from "webpack";
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
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-themes",
  ],
  webpackFinal: async (config: Configuration) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      ...alias,
    };
    config.plugins?.push(
      new CircularDependencyPlugin({
        exclude: /node_modules/,
        include: /jui/,
        failOnError: false,
      })
    );
    return config;
  },
};
