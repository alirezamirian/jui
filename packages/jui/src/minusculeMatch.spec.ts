import { minusculeMatch } from "./minusculeMatch";
import { TextRange } from "./TextRange";

describe("findInText", () => {
  it("finds simple matches", () => {
    const ranges = minusculeMatch("Paco de lucia", "lucia");
    expect(ranges).toEqual(createRanges("Paco de {lucia}"));
  });

  it("is case insensitive", () => {
    const ranges = minusculeMatch("Paco de lucia", "paco");
    expect(ranges).toEqual(createRanges("{Paco} de lucia"));
  });

  it("ignores spaces", () => {
    const ranges = minusculeMatch("Paco de lucia", "pacode");
    expect(ranges).toEqual(createRanges("{Paco} {de} lucia"));
  });

  it("works", () => {
    let ranges = minusculeMatch("findInText.test.ts", "finittt");
    expect(ranges).not.toEqual(null);
    expect(ranges).toEqual(createRanges("{fin}d{I}n{T}ext.{t}est.{t}s"));

    ranges = minusculeMatch("WCCJ-130-css-module-types", "wccs");
    expect(ranges).not.toEqual(null);
    expect(ranges).toEqual(createRanges("{WC}CJ-130-{cs}s-module-types"));
  });
});

/**
 * Helper for better readability of expected text ranges.
 * @example
 * - createRanges("{P}aco {t}he {Luc}ia") => [{from: 0, to: 0], [from: 5, to: 5], [from: 9, to: 11]}
 */
function createRanges(str: string): TextRange[] {
  const regExp = /{.*?}/g;
  let visitedBraces = 0;
  let result;
  const ranges: TextRange[] = [];
  while ((result = regExp.exec(str))) {
    const { 0: match, index } = result;
    const from = index - visitedBraces;
    const to = from + match.length - 3;
    ranges.push({
      from,
      to,
    });
    visitedBraces += 2;
  }
  return ranges;
}
