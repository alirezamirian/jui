const packageJson = require("../packages/jui/package.json");
const path = require("path");

/**
 * Alias configuration used in storybook webpack config and website's webpack config to resolve @intellij-platform/*
 * from source. An alternative to try would be
 * [tsconfig-paths-webpack-plugin](https://github.com/dividab/tsconfig-paths-webpack-plugin).
 */
module.exports = {
  [packageJson.name]: path.resolve(__dirname, "../packages/jui/src"),
};
