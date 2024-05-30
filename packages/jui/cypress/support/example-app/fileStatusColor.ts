export {}; // without import/export the file is not considered a module and `declare global` will be a type error

declare global {
  namespace Cypress {
    interface Chainer<Subject> {
      /**
       * Asserts that the target element's text color is the given file status color.
       * @example
       *    cy.findByRole("tab", {name: "test.ts"}).should('have.fileStatusColor', 'modified')
       */
      (
        chainer: "have.fileStatusColor",
        expectedColor:
          | "new"
          | "unmodified"
          | "modified"
          | "deleted"
          | "unversioned"
      ): Cypress.Chainable<Subject>;
    }
  }
}

chai.Assertion.addMethod("fileStatusColor", function (expectedColor) {
  const element = this._obj;

  // Use jQuery to get the computed CSS style of the element
  const mapping = {
    red: "unversioned",
    mutedGrey: "deleted",
    blue: "modified",
    grey: "unmodified",
    green: "new",
  } as const;

  const $element = Cypress.$(element);
  const { color, estimatedColor } =
    $element
      .add($element.find("*"))
      .map(function () {
        const element: Cypress.JQueryWithSelector = Cypress.$(this);
        if (element.text().trim()) {
          const color = element.css("color");
          const colorEstimation = getColorEstimation(color);
          if (colorEstimation) {
            return { color, estimatedColor: colorEstimation };
          }
        }
      })
      .last()[0] ?? {};
  if (!estimatedColor) {
    throw new Error(
      `could not match the color with any file status color: ${color}`
    );
  }
  const actualColor = mapping[estimatedColor];

  // Assert that the actual color matches the expected color
  this.assert(
    actualColor === expectedColor,
    `expected element to have file status color #{exp} but got #{act}`,
    `expected element not to have file status color #{exp}`,
    expectedColor, // expected
    actualColor // actual
  );
});

function getColorEstimation(
  rgbStr: string
): "red" | "green" | "blue" | "grey" | "mutedGrey" | undefined {
  const [_, r, g, b] =
    rgbStr.match(/rgba?\((\d{1,3})\s?,\s?(\d{1,3}),\s?(\d{1,3})\)/) || [];
  if (!r || !g || !b) {
    throw new Error(`Unexpected color format: ${rgbStr}`);
  }
  const color = [r, g, b].map((str) => parseInt(str)) as [
    number,
    number,
    number
  ];
  return Object.entries(colorEstimations).find(([_, matches]) =>
    matches(color)
  )?.[0] as keyof typeof colorEstimations;
}
const colorEstimations = {
  green: ([red, green, blue]: [number, number, number]) =>
    blue < 0.85 * green && red < 0.85 * green,
  blue: ([red, green, blue]: [number, number, number]) =>
    green < 0.85 * blue && red < 0.85 * blue,
  red: ([red, green, blue]: [number, number, number]) =>
    green < 0.85 * red && blue < 0.85 * red,
  mutedGrey: ([red, green, blue]: [number, number, number]) => {
    return colorEstimations.grey([red, green, blue]) && red < 130;
  },
  grey: ([red, green, blue]: [number, number, number]) => {
    const tolerance = 15; // Tolerance for how similar the values need to be
    return (
      Math.abs(red - green) < tolerance &&
      Math.abs(red - blue) < tolerance &&
      Math.abs(green - blue) < tolerance
    );
  },
};
