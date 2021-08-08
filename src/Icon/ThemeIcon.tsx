import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { Theme } from "../Theme/Theme";
import { IconProps } from "./IconProps";
import { StyledIconWrapper } from "./StyledIconWrapper";

type ThemeIconDescriptor = string | { path: string; fallback: string };

interface ThemeIconProps extends IconProps {
  icon: ThemeIconDescriptor;
}

function useThemeIcon(themeIcon: ThemeIconDescriptor) {
  const theme = useTheme() as Theme; // TODO: investigate why useTheme is typed like this
  const [svg, setSvg] = useState("");
  useEffect(() => {
    const fetchIcon = async () => {
      if (!themeIcon) {
        console.error("invalid icon src", themeIcon);
        return;
      }
      const path = typeof themeIcon === "object" ? themeIcon.path : themeIcon;
      const fallback =
        typeof themeIcon === "object" ? themeIcon.fallback : undefined;
      const svg = await theme.icon(path, fallback);

      if (svg) {
        setSvg(svg);
      } else {
        console.error("Could not resolve icon:", themeIcon);
      }
    };
    fetchIcon().catch(console.error);
  }, [themeIcon]);
  return svg;
}

export function ThemeIcon({ icon, size, ...props }: ThemeIconProps) {
  const svg = useThemeIcon(icon);
  return (
    <StyledIconWrapper {...props} dangerouslySetInnerHTML={{ __html: svg }} />
  );
}
