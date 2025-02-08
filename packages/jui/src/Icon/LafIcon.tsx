import React, { ForwardedRef } from "react";
import { useTheme } from "styled-components";
import { Theme } from "../Theme/Theme";
import { IconProps } from "./IconProps";
import { StyledIconWrapper } from "./StyledIconWrapper";
import { useSvgIcon } from "./useSvgIcon";
import { useObjectRef } from "@react-aria/utils";

interface IconModifiers {
  Selected?: boolean;
  Focused?: boolean;
  Disabled?: boolean;
  Editable?: boolean;
  Pressed?: boolean;
}

export interface ThemeIconProps extends IconProps {
  /**
   * Icon which will be resolved against the default icon location based on theme type
   */
  icon: string | { name: string; modifiers: IconModifiers };

  /**
   * A theme key that can optionally override the icon.
   */
  themePath?: string;
}

const ICONS_DIR_PREFIX = "com/intellij/ide/ui/laf/icons/";

// Similar to LafIconLookup
function findIconPath(
  theme: Theme,
  name: string,
  modifiers: IconModifiers = {}
) {
  const basePath = `${ICONS_DIR_PREFIX}${
    theme.isUnderDarcula() ? "darcula/" : "intellij/"
  }`;
  const suffix = (
    ["Editable", "Selected", "Pressed", "Focused", "Disabled"] as Array<
      keyof typeof modifiers
    >
  )
    .filter((modifier) =>
      // Focused or Pressed can't coexist with Disabled
      modifiers.Disabled ? !["Focused", "Pressed"].includes(modifier) : true
    )
    .reduce(
      (soFar, modifier) => soFar + (modifiers[modifier] ? modifier : ""),
      ""
    );
  return `${basePath}${name}${suffix}.svg`;
}

function useIconPath(
  iconDescriptor: string | { name: string; modifiers?: IconModifiers },
  themePath?: string
) {
  const theme = useTheme() as Theme; // TODO: investigate why useTheme is typed like this
  const resolvedValue = themePath && theme.value(themePath);
  if (resolvedValue) {
    return resolvedValue;
  }
  const { modifiers = {}, name } =
    typeof iconDescriptor === "string"
      ? { name: iconDescriptor }
      : iconDescriptor;
  return findIconPath(theme, name, modifiers);
}

export const LafIcon = React.forwardRef(
  (
    { themePath, icon, size, ...props }: ThemeIconProps,
    forwardedRef: ForwardedRef<HTMLElement>
  ) => {
    const resolvedIconPath = useIconPath(icon, themePath);

    const ref = useObjectRef(forwardedRef);
    useSvgIcon(
      { path: `platform/platform-impl/resources/${resolvedIconPath}` },
      ref
    );
    return <StyledIconWrapper {...props} ref={ref} size={size} />;
  }
);
