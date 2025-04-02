import { styled } from "@intellij-platform/core/styled";
import React, { ForwardedRef } from "react";
import { amendName, PlatformIcon, PlatformIconProps } from "./PlatformIcon";

export const StyledHoverContainer = styled.span<{
  $hoverContainerSelector?: string;
}>`
  ${({ $hoverContainerSelector }) =>
    $hoverContainerSelector
      ? `${$hoverContainerSelector} &`
      : ""} .icon[data-hover] {
    display: none;
  }

  ${({ $hoverContainerSelector }) =>
    $hoverContainerSelector
      ? `${$hoverContainerSelector}:hover &`
      : "&:hover"} {
    .icon {
      display: none;
    }

    .icon[data-hover] {
      display: inline-flex;
    }
  }
`;

const StyledIconHoverContainer = styled(StyledHoverContainer)`
  display: inline-flex;
`;

/**
 * A common use case for PlatformIcons is to have a default icon and a hover icon.
 * This component captures that simple use case, by rendering both icons, and hiding one based on a hover selector.
 *
 * ### Parent hover container
 *
 * If the hover-able element is a parent of the icon, and not the icon itself (i.e., the icon should change if the
 * that parent is hovered), you can use `StyledHoverContainer` to define that parent element:
 *
 * ```tsx
 * const SomeParent = styled(StyledHoverContainer)`...`;
 * <SomeParent><AutoHoverPlatformIcon icon="..." /></SomeParent>
 * ```
 *
 * If the hover-able element is a parent of the icon, with a known selector, you can pass `hoverContainerSelector`,
 * instead of using `StyledHoverContainer`:
 *
 * ```tsx
 * <AutoHoverPlatformIcon icon="..." hoverContainerSelector="[role=menuitem]" />
 * ```
 *
 * If the hover container is a styled component, you can have it converted to selector like this:
 *
 * ```tsx
 * <AutoHoverPlatformIcon icon="..." hoverContainerSelector={`${MyStyledHoverContainer}`} />
 * ```
 *
 * In all examples above, the hover icon is shown when the parent is hovered, instead of the icon itself.
 *
 */
export const AutoHoverPlatformIcon = React.forwardRef(
  function AutoHoverPlatformIcon(
    {
      hoverIcon,
      hoverContainerSelector,
      ...props
    }: PlatformIconProps & {
      /**
       * The icon to be used when hovered. If not provided, it will be the "somethingHovered" where "something" is the `icon`
       */
      hoverIcon?: string;
      hoverContainerSelector?: string;
    },
    ref: ForwardedRef<HTMLSpanElement>
  ) {
    const className = `icon ${props.className || ""}`;
    return (
      <StyledIconHoverContainer
        ref={ref}
        $hoverContainerSelector={hoverContainerSelector}
      >
        <PlatformIcon {...props} className={className} />
        <PlatformIcon
          {...props}
          className={className}
          icon={hoverIcon ?? amendName(props.icon, "Hover")}
          data-hover
        />
      </StyledIconHoverContainer>
    );
  }
);
