import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { Theme } from "../Theme/Theme";
import { IconProps } from "./IconProps";
import { StyledIconWrapper } from "./StyledIconWrapper";

interface ThemeIconProps extends IconProps {
  iconPath: string;
  fallbackIcon: string;
}

function useThemeIcon(path: string, fallback: string) {
  const theme = useTheme() as Theme; // TODO: investigate why useTheme is typed like this
  const [svg, setSvg] = useState("");
  useEffect(() => {
    const fetchIcon = async () => {
      if (!path && !fallback) {
        console.error("No path or fallback provided for theme icon");
        return;
      }
      const svg = await theme.icon(path, fallback);

      if (svg) {
        setSvg(svg);
      } else {
        console.error("Could not resolve icon:", path || fallback);
      }
    };
    fetchIcon().catch(console.error);
  }, [path, fallback]);
  return svg;
}

export function ThemeIcon({
  iconPath,
  fallbackIcon,
  size,
  ...props
}: ThemeIconProps) {
  const svg = useThemeIcon(iconPath, fallbackIcon);
  return (
    <StyledIconWrapper {...props} dangerouslySetInnerHTML={{ __html: svg }} />
  );
}
