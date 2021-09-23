import * as path from "path";
// @ts-expect-error resolveJsonModule is set to true but doesn't work for some reason, at least in the IDE.
import packageJson from "../package.json";

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
  webpackFinal: async (config) => {
    config.resolve.alias = {
      [packageJson.name]: path.resolve(__dirname, "../src"), // to link package usages to src. for example-app
    };
    return config;
  },
};
