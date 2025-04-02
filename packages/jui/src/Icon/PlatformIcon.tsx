import React, { ForwardedRef } from "react";
import { useTheme } from "@intellij-platform/core/styled";
import { IconProps } from "./IconProps";
import { StyledIconWrapper } from "./StyledIconWrapper";
import { useSvgIcon } from "./useSvgIcon";
import { useObjectRef } from "@react-aria/utils";

export interface PlatformIconProps extends IconProps {
  /**
   * Icon path in intellij platform repo.
   * If starts with "/", the path will be from the repo root. Otherwise, it's relative to "platform/icons/src".
   * ".svg" extension is optional.
   */
  icon: string;
  /**
   * Similar to icon, but for dark themes.
   */
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
  relativePath.startsWith("/")
    ? relativePath.slice(1)
    : `platform/icons/src/${relativePath}`;

/**
 * Renders an icon from the predefined list of platform icons.
 * icon name must follow the directory structure in platform icons.
 * @example <PlatformIcon icon="general/hideToolWindow" />
 * @example <PlatformIcon icon="toolbar/pin" />
 * @example <PlatformIcon icon="toolbar/pin.svg" />
 * @example <PlatformIcon icon="/platform/dvcs-impl/resources/icons/currentBranchLabel.svg" />
 */
export const PlatformIcon = React.forwardRef(
  (
    { icon, darkIcon, size, ...props }: PlatformIconProps,
    forwardedRef: ForwardedRef<HTMLElement>
  ) => {
    const ref = useObjectRef(forwardedRef);
    const theme = useTheme();
    const iconName = theme.dark ? getDarkPath(icon, darkIcon) : icon;
    useSvgIcon(
      {
        path: getPlatformIconPath(iconName),
        fallbackPath: getPlatformIconPath(icon),
      },
      ref
    );

    return <StyledIconWrapper {...props} $size={size} ref={ref} />;
  }
);
