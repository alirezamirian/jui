const docusaurusPreset = require("@docusaurus/core/lib/babel/preset");
module.exports = (api) => {
  const callerName = api.caller((caller) => caller?.name);
  const loose = callerName !== "server";
  api.cache.using(() => callerName);
  return {
    presets: [docusaurusPreset],
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true, loose }],
      ["@babel/plugin-proposal-class-properties", { loose }],
      "@babel/plugin-transform-typescript",
      ["babel-plugin-styled-components", { displayName: true }],
    ],
  };
};
