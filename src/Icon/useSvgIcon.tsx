import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { Theme } from "../Theme/Theme";

export function useSvgIcon(path: string) {
  const theme = useTheme() as Theme; // TODO: investigate why useTheme is typed like this
  const [svg, setSvg] = useState("");
  useEffect(() => {
    let unmounted = false;
    const fetchIcon = async () => {
      if (!path) {
        console.error("icon path is empty");
        return;
      }
      const svg = await theme.getSvgIcon(path);

      if (svg) {
        if (!unmounted) {
          setSvg(svg);
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
  return svg;
}
