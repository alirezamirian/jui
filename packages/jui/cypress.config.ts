import { defineConfig } from "cypress";
// @ts-expect-error: missing type definition
import { initPlugin } from "cypress-plugin-snapshots/plugin";
import webpackConfig from "./cypress/webpack.config";

export default defineConfig({
  projectId: "o1ooqz",
  component: {
    specPattern: "(src|integration-tests)/**/*.cy-test.{js,ts,jsx,tsx}",
    setupNodeEvents(on, config) {
      // TODO: consider moving to https://github.com/FRSOURCE/cypress-plugin-visual-regression-diff
      initPlugin(on, config);
      return config;
    },
    devServer: {
      framework: "react",
      bundler: "webpack",
      // optionally pass in webpack config
      webpackConfig,
    },
  },
});
