const packageJson = require("../packages/jui/package.json");
const path = require("path");

/**
 *
 * @type {{[p: string]: string}}
 */
module.exports = {
  [packageJson.name]: path.resolve(__dirname, "../packages/jui/src"),
};
