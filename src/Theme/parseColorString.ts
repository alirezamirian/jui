// language=JSRegexp
const numberPattern = "[0-9]{0,3}.?[0-9]*";

const parseComponent = (componentStr: string, index: number) =>
  componentStr
    ? index < 3
      ? parseInt(componentStr)
      : Math.round(Math.min(parseFloat(componentStr), 1) * 255)
    : undefined;

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
    .match(
      new RegExp(
        `^rgb\\(\\s*(${numberPattern})\\s*,\\s*(${numberPattern})\\s*,\\s*(${numberPattern}\\s*)\\)$`
      )
    )
    ?.slice(1, 5)
    .map(parseComponent);
const parseRgba = (str: string) =>
  str
    .match(
      new RegExp(
        `^rgba\\(\\s*(${numberPattern})\\s*,\\s*(${numberPattern})\\s*,\\s*(${numberPattern})\\s*,\\s*(${numberPattern}\\s*)\\)$`
      )
    )
    ?.slice(1, 5)
    .map(parseComponent);

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
