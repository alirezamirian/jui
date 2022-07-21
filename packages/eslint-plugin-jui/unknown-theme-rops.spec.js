const { RuleTester } = require("eslint");
const noEmptyCatchRule = require("./unknown-theme-props");
const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
});

ruleTester.run("no-empty-catch", noEmptyCatchRule, {
  valid: [
    {
      code: "const x = 'foo' as UnknownThemeProp<'foo'>",
    },
  ],
  invalid: [
    {
      code: "const x = 'foo' as UnknownThemeProp<'bar'>",
      // we can use messageId from the rule object
      errors: [{ messageId: "wrongGenericArg" }],
    },
  ],
});
