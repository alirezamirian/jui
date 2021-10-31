import { RefObject, useEffect } from "react";
import { useTheme } from "styled-components";
import { Theme } from "../Theme/Theme";

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
  const theme = useTheme() as Theme; // TODO: investigate why useTheme is typed like this
  useEffect(() => {
    let unmounted = false;
    const fetchIcon = async () => {
      if (!path) {
        console.error("icon path is empty");
        return;
      }
      const svg = await theme.getSvgIcon(path).catch((e) => {
        if (fallbackPath) {
          return theme.getSvgIcon(fallbackPath);
        }
        throw e;
      });

      if (svg) {
        if (!unmounted && ref?.current) {
          if (ref) {
            // potential SSR issues here?
            ref.current?.querySelector("svg")?.remove();
            const svgElement = document.createElement("svg");
            ref.current?.appendChild(svgElement);
            svgElement.outerHTML = svg;
          }
        }
      } else {
        console.error("Could not resolve icon:", path);
      }
    };
    fetchIcon().catch(console.error);
    return () => {
      unmounted = true;
    };
  }, [path]);
}
