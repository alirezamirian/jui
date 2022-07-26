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
  const selected = itemState?.isSelected || itemState?.isFocused;
  useEffect(() => {
    let unmounted = false;
    const fetchIcon = async () => {
      if (!path) {
        console.error("icon path is empty");
        return;
      }
      if (ref.current) {
        // For querying for icons that are not loaded yet. Especially useful for visual testing
        ref.current.dataset.loadingIcon = "true";
      }
      const svg = await theme.getSvgIcon(path, selected).catch((e) => {
        if (fallbackPath) {
          return theme.getSvgIcon(fallbackPath, selected);
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
            delete ref.current?.dataset.loadingIcon;
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
  }, [path, selected]);
}
