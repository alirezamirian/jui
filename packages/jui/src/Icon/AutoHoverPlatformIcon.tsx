import { styled } from "@intellij-platform/core/styled";
import React from "react";
import { amendName, PlatformIcon, PlatformIconProps } from "./PlatformIcon";

export const StyledHoverContainer = styled.span`
  .icon[data-hover] {
    display: none;
  }
  &:hover {
    .icon {
      display: none;
    }
    .icon[data-hover] {
      display: unset;
    }
  }
`;

const StyledIconHoverContainer = styled(StyledHoverContainer)`
  display: inline-flex;
`;

/**
 * A common use case for PlatformIcons is to have a default icon and a hover icon.
 * This component captures that simple use case, by rendering both icons, and hiding one based on a hover selector.
 * If the hover-able element is a parent of the icon, and not the icon itself, one can use `StyledHoverContainer`,
 * for that parent element:
 * const SomeParent = styled(StyledHoverContainer)`...`;
 * <SomeParent><AutoHoverPlatformIcon icon="..." /></SomeParent>
 *
 * Now the hover icon is shown when the parent is hovered, instead of the icon itself.
 *
 */
export const AutoHoverPlatformIcon: React.FC<
  PlatformIconProps & {
    /**
     * The icon to be used when hovered. If not provided, it will be the "somethingHovered" where "something" is the `icon`
     */
    hoverIcon?: string;
  }
> = ({ hoverIcon, ...props }) => {
  const className = `icon ${props.className || ""}`;
  return (
    <StyledIconHoverContainer>
      <PlatformIcon {...props} className={className} />
      <PlatformIcon
        {...props}
        className={className}
        icon={hoverIcon ?? amendName(props.icon, "Hover")}
        data-hover
      />
    </StyledIconHoverContainer>
  );
};
