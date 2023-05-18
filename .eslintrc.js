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
      // Only source files
      files: ["packages/jui/src/**"],
      excludedFiles: [
        "packages/**/*.+(stories|test|spec|cy).tsx",
        "packages/jui/src/**/story-helpers.tsx",
      ],
      rules: {
        "no-restricted-imports": [
          ERROR,
          // No direct import from entry point, as it creates circular dependency. inter-module imports should be from
          // "@intellij-platform/core/*" instead, within each module (top level dir), imports should be relative.
          { paths: ["@intellij-platform/core"] },
        ],
      },
    },
    {
      // Only jest test files
      files: ["packages/**/*.spec.+(ts|tsx)", "packages/**/*.test.+(ts|tsx)"],
      plugins: ["jest", "no-only-tests"],
      env: {
        jest: true,
      },
      rules: {
        "no-only-tests/no-only-tests": ERROR,
      },
    },
    {
      // Only cypress test files
      files: ["packages/**/*.cy.+(ts|tsx)"],
      plugins: ["cypress", "no-only-tests"],
      env: {
        "cypress/globals": true,
      },
      rules: {
        "no-only-tests/no-only-tests": ERROR,
      },
    },
  ],
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    JSX: "readonly",
  },
};
