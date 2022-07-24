const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  plugins: ["monorepo"],
  extends: [
    "eslint:recommended",
    // "plugin:monorepo/recommended", // FIXME
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
    sourceType: "module",
  },
  overrides: [
    {
      files: ["packages/**/*.+(ts|tsx)"],
      plugins: [
        "@typescript-eslint",
        "react",
        "react-hooks",
        "eslint-plugin-jui",
        /*"jsdoc"*/
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          legacyDecorators: true,
        },
        useJSXTextNode: true,
        project: "./tsconfig.json",
        sourceType: "module",
      },
      extends: [
        "plugin:eslint-plugin-jui/recommended",
        // "plugin:@typescript-eslint/recommended",
        // "plugin:react-hooks/recommended",
        // "plugin:react/recommended",
      ], // FIXME enable recommended rulesets and remove custom fixes if possible
      rules: {
        // "no-redeclare": OFF,
        // "@typescript-eslint/no-redeclare": ERROR,
        "no-unused-vars": OFF,
        "no-empty-pattern": OFF,
        "no-dupe-class-members": OFF, // no need in ts. TSC handles it, and it doesn't work nice with method overloads
        "no-redeclare": "off",
        "@typescript-eslint/no-redeclare": ["warn"],
      },
    },
    {
      files: ["packages/jui/scripts/**", "babel.config.js", ".eslintrc.js"],
      env: {
        node: true,
      },
    },
    {
      files: ["packages/**/*.spec.+(ts|tsx)", "packages/**/*.test.+(ts|tsx)"],
      plugins: ["jest"],
      env: {
        jest: true,
      },
    },
    // TODO: add overrides for cypress tests
  ],
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    JSX: "readonly",
  },
};
