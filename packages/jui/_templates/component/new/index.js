// change-case is a phantom dependency, but it should be fine. Inside the template also the same version provided
// by hygen will be used
const changeCase = require("change-case");

module.exports = {
  params: ({ args }) => {
    if (!args.name) {
      const cmd =
        process.env.npm_lifecycle_event === "generate:component"
          ? "generate:component"
          : "hygen component new";
      throw new Error(
        `No name provided. The right format is: yarn ${cmd} MyNewComponent`
      );
    }
    return { componentName: changeCase.pascal(args.name) };
  },
};
