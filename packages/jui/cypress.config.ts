import { defineConfig } from "cypress";
// @ts-expect-error: missing type definition
import { initPlugin } from "cypress-plugin-snapshots/plugin";
import webpackConfig from "./cypress/webpack.config";

// @ts-expect-error: missing type definition
import addPlaybackTask from "@oreillymedia/cypress-playback/addTasks";

export default defineConfig({
  projectId: "o1ooqz",

  component: {
    setupNodeEvents(on, config) {
      // TODO: consider moving to https://github.com/FRSOURCE/cypress-plugin-visual-regression-diff
      initPlugin(on, config);
      addPlaybackTask(on, config);
      return config;
    },
    devServer: {
      framework: "react",
      bundler: "webpack",
      // optionally pass in webpack config
      webpackConfig,
    },
  },

  e2e: {
    env: {
      PLAYBACK_MODE: "hybrid",
    },
    viewportWidth: 1280,
    viewportHeight: 800,
    baseUrl:
      // eslint-disable-next-line no-undef
      process.env.CI === "true"
        ? "http://localhost:1234/?clone=false" // example-app serve port
        : "http://localhost:6008/iframe.html?id=demos-example-app--example-app&clone=false",
    setupNodeEvents(on, config) {
      initPlugin(on, config);
      addPlaybackTask(on, config);
      return config;
      // implement node event listeners here
    },
  },
});
