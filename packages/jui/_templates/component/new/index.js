// change-case is a transitive dependency, but it should be fine. Inside the template also the same version provided
// by hygen will be used
const changeCase = require("change-case");

module.exports = {
  params: ({ args }) => {
    return { componentName: changeCase.pascal(args.name) };
  },
};
