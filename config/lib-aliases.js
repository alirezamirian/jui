const path = require("path");
const packageJson = require("../packages/jui/package.json");

/**
 * Alias configuration to load the lib from src.
 */
module.exports = {
  // it's important for this to come before the src alias.
  "@intellij-platform/core/themes": path.resolve(
    __dirname,
    "../packages/jui/themes"
  ),
  [packageJson.name]: path.resolve(__dirname, "../packages/jui/src"),
};
