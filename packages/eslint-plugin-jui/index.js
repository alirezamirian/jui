module.exports = {
  rules: {
    "unknown-theme-prop": require("./unknown-theme-props"),
  },
  configs: {
    recommended: {
      rules: {
        "jui/unknown-theme-prop": "error",
      },
    },
  },
};
