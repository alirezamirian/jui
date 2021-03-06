import React, { ForwardedRef } from "react";
import useForwardedRef from "@intellij-platform/core/utils/useForwardedRef";
import { useTheme } from "styled-components";
import { Theme } from "../Theme/Theme";
import { IconProps } from "./IconProps";
import { StyledIconWrapper } from "./StyledIconWrapper";
import { useSvgIcon } from "./useSvgIcon";

export interface PlatformIconProps extends IconProps {
  icon: string;
  darkIcon?: string;
}

export const amendName = (iconNameOrPath: string, amendment: string) => {
  const [name, ext] = iconNameOrPath.split(".");
  return `${name}${amendment}${ext ? `.${ext}` : ""}`;
};

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
    { icon, darkIcon, ...props }: PlatformIconProps,
    forwardedRef: ForwardedRef<HTMLElement>
  ) => {
    const ref = useForwardedRef(forwardedRef);
    const theme = useTheme() as Theme; // TODO: investigate why useTheme is typed like this
    const iconName = theme.dark ? getDarkPath(icon, darkIcon) : icon;
    useSvgIcon(
      {
        path: getPlatformIconPath(iconName),
        fallbackPath: getPlatformIconPath(icon),
      },
      ref
    );

    return <StyledIconWrapper {...props} ref={ref} />;
  }
);
