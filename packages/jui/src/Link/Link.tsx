import React, { ForwardedRef } from "react";
import { AriaLinkProps } from "@react-types/link";
import { FocusRing, useFocusable } from "@react-aria/focus";
import { StyledLink } from "@intellij-platform/core/Link/StyledLink";
import { usePress } from "@react-aria/interactions";
import { filterDOMProps, mergeProps, useObjectRef } from "@react-aria/utils";

export type LinkProps = AriaLinkProps & {
  isDisabled?: boolean;
  className?: string;
  children: React.ReactNode;
  preventFocusOnPress?: boolean; // Should this be become true by default?
  excludeFromTabOrder?: boolean;
};

/**
 * A focusable span in style of [Link](https://jetbrains.github.io/ui/controls/link/) and with accessibility role of link.
 *
 * TODO and known issues:
 * - in the reference impl, Space presses the link, Enter doesn't. It's vice versa here, because of how usePress is implemented.
 * - Support for External links
 * - Support for Anchor elements?
 *
 * Unknowns:
 * - What are ActionLink and DefaultLinkButtonUI?
 * - What is HyperLinkLabel compared to LabelLink (which was looked into in implementation of this component)?
 */
export const Link = React.forwardRef(
  (
    props: LinkProps,
    forwardedRef: ForwardedRef<HTMLAnchorElement>
  ): React.ReactElement => {
    const ref = useObjectRef(forwardedRef);

    const { focusableProps } = useFocusable(props, ref);
    const { pressProps, isPressed } = usePress({ ...props, ref });
    const domProps = filterDOMProps(props, { labelable: true });
    const interactionHandlers = mergeProps(focusableProps, pressProps);

    return (
      <FocusRing focusRingClass="focus-visible">
        <StyledLink
          {...mergeProps(focusableProps, interactionHandlers, domProps)}
          as="span"
          role="link"
          ref={ref}
          // maybe use clsx
          className={`${props.isDisabled ? "disabled" : ""} ${
            isPressed ? "active" : ""
          } ${props.className || ""}`}
          aria-disabled={props.isDisabled || undefined}
          tabIndex={
            !props.isDisabled ? (props.excludeFromTabOrder ? -1 : 0) : undefined
          }
        >
          {props.children}
        </StyledLink>
      </FocusRing>
    );
  }
);
