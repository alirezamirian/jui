import React, { ForwardedRef } from "react";
import { useTheme } from "styled-components";
import { Theme } from "../Theme/Theme";
import { IconProps } from "./IconProps";
import { StyledIconWrapper } from "./StyledIconWrapper";
import { useSvgIcon } from "./useSvgIcon";

interface PlatformIconProps extends IconProps {
  icon: string;
  darkIcon?: string;
}

export const getDarkPath = (path: string, darkPath?: string) => {
  const [name, ext] = path.split(".");
  return darkPath || `${name}_dark${ext ? `.${ext}` : ""}`;
};

const getPlatformIconPath = (relativePath: string) =>
  `platform/icons/src/${relativePath}`;

/**
 * Renders an icon from the predefined list of platform icons.
 * icon name must follow the directory structure in platform icons.
 * @example <PlatformIcon icon="general/hideToolWindow" />
 * @example <PlatformIcon icon="toolbar/pin" />
 * @example <PlatformIcon icon="toolbar/pin.svg" />
 */
export const PlatformIcon = React.forwardRef(
  (
    { icon, darkIcon, size, ...props }: PlatformIconProps,
    ref: ForwardedRef<HTMLElement>
  ) => {
    const theme = useTheme() as Theme; // TODO: investigate why useTheme is typed like this
    const iconName = theme.dark ? getDarkPath(icon, darkIcon) : icon;
    const svg = useSvgIcon(
      getPlatformIconPath(iconName),
      getPlatformIconPath(icon)
    );
    return (
      <StyledIconWrapper
        {...props}
        ref={ref}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }
);
