import { RefObject, useContext, useEffect } from "react";
import { useTheme } from "@intellij-platform/core/styled";
import { ItemStateContext } from "@intellij-platform/core/Collections";

export function useSvgIcon(
  { path, fallbackPath }: { path: string; fallbackPath?: string },
  /**
   * ref to the icon wrapper element in which the svg should be injected.
   * This hook used to return svg string, and that svg was set as dangerouslySetInnerHTML. But now it injects the svg.
   * by direct DOM manipulation. That's to eliminate the need for using dangerouslySetInnerHTML, so that we can allow
   * arbitrary children (like LiveIndicator) as overlays on top of icons.
   */
  ref: RefObject<HTMLElement>
) {
  const theme = useTheme();
  const itemState = useContext(ItemStateContext);
  const selected = itemState?.isSelected || itemState?.isContainerFocused;
  useEffect(() => {
    let unmounted = false;
    const fetchIcon = async () => {
      if (!path) {
        console.error("icon path is empty");
        return;
      }
      if (ref.current) {
        // For querying for icons that are not loaded yet. Especially useful for visual testing
        ref.current.ariaBusy = "true";
      }
      const svg = await theme.getSvgIcon(path, selected).catch((e) => {
        if (fallbackPath) {
          return theme.getSvgIcon(fallbackPath, selected);
        }
        throw e;
      });
      if (svg) {
        const element = ref?.current;
        if (!unmounted && element) {
          element.querySelector("svg")?.remove();
          const svgElement = document.createElement("svg");
          element.appendChild(svgElement);
          svgElement.outerHTML = makeIdsUnique(svg); // UNSAFE! Would require sanitization, or icon sources must be trusted.
          element.ariaBusy = "false";
        }
      } else {
        console.error("Could not resolve icon:", path);
      }
    };
    fetchIcon().catch(console.error);
    return () => {
      unmounted = true;
    };
  }, [path, selected]);
}

/**
 * If multiple instance of the same icon is rendered at the same time, and the SVG includes
 * url(#...) references to locally defined ids, in some cases the icon is not rendered properly.
 * because of ids colliding. We make sure the ids are unique in each rendered icon.
 */
function makeIdsUnique(svg: string): string {
  const randomPostfix = (Math.random() * 1000).toFixed(0);
  const idMatches = svg.matchAll(/id="(.*?)"/g);
  return [...idMatches].reduce((modifiedSvg, [_, id]) => {
    const newId = `${id}-${randomPostfix}`;
    return replaceAll(
      `id="${id}"`,
      `id="${newId}"`,
      replaceAll(`url(#${id})`, `url(#${newId})`, modifiedSvg)
    );
  }, svg);
}

function replaceAll(theOld: string, theNew: string, str: string): string {
  const replaced = str.replace(theOld, theNew);
  const replacedAgain = replaced.replace(theOld, theNew);
  if (replaced === replacedAgain) {
    return replaced;
  }
  return replaceAll(theOld, theNew, replacedAgain);
}
