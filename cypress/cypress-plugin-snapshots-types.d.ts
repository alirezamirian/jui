// Typing in the last published version of cypress-plugin-snapshots is outdated. It's fixed on master but not published.
// The fix is copied over here until it's release.
// TODO: remove this file when a new version of cypress-plugin-snapshots is release. remember to add
//  "cypress-plugin-snapshots" to "types" array in tsconfig.cypress.json
// See more: https://github.com/meinaart/cypress-plugin-snapshots/issues/193
declare namespace Cypress {
  interface Chainable<Subject = any> {
    toMatchSnapshot(
      options?: Partial<{
        ignoreExtralFields: boolean;
        ignoreExtraArrayItems: boolean;
        normalizeJson: boolean;
        replace: any;
        name: string;
      }>
    ): Chainable<null>;

    toMatchImageSnapshot(
      options?: Partial<{
        imageConfig: Partial<{
          createDiffImage: boolean;
          threshold: number;
          thresholdType: "percent" | "pixels";
          resizeDevicePixelRatio: boolean;
        }>;
        screenshotConfig: Partial<ScreenshotDefaultsOptions>;
        name: string;
        separator: string;
      }>
    ): Chainable<null>;
  }
}
