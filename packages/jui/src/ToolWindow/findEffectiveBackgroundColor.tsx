import { Color } from "../Theme/Color";

/**
 * Computes the effective background color of the element by blending translucent backgrounds of
 * the elements ancestors. It traverses up the parents, until reaches a solid background color.
 * all translucent backgrounds in between are blended with that solid color, with respect to their
 * transparency. It's meant to be used only for the simple cases where an element doesn't overflow
 * the parents. Obviously, in other cases there won't be one single effective background color
 * for the element.
 */
export function findEffectiveBackgroundColor(element: HTMLElement): string {
  let elem: HTMLElement | null = element;
  let colors: Color[] = [];
  while (elem != null) {
    const computedBackground = getComputedStyle(elem).backgroundColor;
    if (computedBackground) {
      const color = new Color(computedBackground);
      colors.unshift(color);
      if (color.a === 255) {
        // if we've reached a solid color, we don't need to continue traversing ancestors
        break;
      }
    }
    elem = elem.parentElement;
  }
  return (
    colors
      .reduce<Color | null>((resultColor, nextColor) => {
        return resultColor ? resultColor.blend(nextColor) : nextColor;
      }, null)
      ?.toString() || ""
  );
}
