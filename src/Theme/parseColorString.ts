const parseHexRgba = (str: string) =>
  str
    .match(/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})?$/i)
    ?.slice(1, 5)
    .map((i) => (i ? parseInt(i, 16) : undefined));
const parseShorthandHex = (str: string) =>
  str
    .match(/^#?([0-9A-F])([0-9A-F])([0-9A-F])$/i)
    ?.slice(1, 4)
    .map((i) => (i ? parseInt(i + i, 16) : undefined));
const parseRgb = (str: string) =>
  str
    .match(/^rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\)$/)
    ?.slice(1, 5)
    .map((i) => (i ? parseInt(i) : undefined));
const parseRgba = (str: string) =>
  str
    .match(
      /^rgba?\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\)$/
    )
    ?.slice(1, 5)
    .map((i) => (i ? parseInt(i) : undefined));

/**
 * parses a color string into rgba components.
 * @param str
 */
export const parseColorString = (
  str: string
): [number, number, number, number?] | null => {
  const result = [parseHexRgba, parseShorthandHex, parseRgb, parseRgba].reduce<
    (number | undefined)[] | undefined
  >((result, parse) => result || parse(str), undefined);
  return Array.isArray(result) &&
    result.slice(0, 3).every((c) => Number.isInteger(c))
    ? (result as [number, number, number, number?])
    : null;
};
