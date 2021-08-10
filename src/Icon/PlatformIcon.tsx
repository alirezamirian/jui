import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { Theme } from "../Theme/Theme";
import { IconProps } from "./IconProps";
import { StyledIconWrapper } from "./StyledIconWrapper";

interface PlatformIconProps extends IconProps {
  icon: string;
  darkIcon?: string;
}

export const getDarkPath = (path: string, darkPath?: string) => {
  const [name, ext] = path.split(".");
  return darkPath || `${name}_dark${ext ? `.${ext}` : ""}`;
};

function usePlatformIcon(path: string, darkPath?: string) {
  const theme = useTheme() as Theme; // TODO: investigate why useTheme is typed like this
  const [svg, setSvg] = useState("");
  const iconName = theme.dark ? getDarkPath(path, darkPath) : path;
  useEffect(() => {
    const fetchIcon = async () => {
      if (!iconName) {
        console.error("invalid icon src", iconName);
        return;
      }
      const svg = await theme.platformIcon(iconName);

      if (svg) {
        setSvg(svg);
      } else {
        console.error("Could not resolve icon:", iconName);
      }
    };
    fetchIcon().catch(console.error);
  }, [iconName]);
  return svg;
}

/**
 * Renders an icon from the predefined list of platform icons.
 * icon name must follow the directory structure in platform icons.
 * @example <PlatformIcon icon="general/hideToolWindow" />
 * @example <PlatformIcon icon="toolbar/pin" />
 * @example <PlatformIcon icon="toolbar/pin.svg" />
 */
export function PlatformIcon({
  icon,
  darkIcon,
  size,
  ...props
}: PlatformIconProps) {
  const svg = usePlatformIcon(icon, darkIcon);
  return (
    <StyledIconWrapper {...props} dangerouslySetInnerHTML={{ __html: svg }} />
  );
}
