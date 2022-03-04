import React, { ForwardedRef } from "react";
import { AriaLinkProps } from "@react-types/link";
import { useLink } from "@react-aria/link";
import useForwardedRef from "@intellij-platform/core/utils/useForwardedRef";
import { FocusRing } from "@react-aria/focus";
import { StyledLink } from "@intellij-platform/core/Link/StyledLink";

export type LinkProps = AriaLinkProps & {
  isDisabled?: boolean;
  className?: string;
  children: React.ReactNode;
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
    const ref = useForwardedRef(forwardedRef);
    const { linkProps, isPressed } = useLink(
      { ...props, elementType: "span" },
      ref
    );
    return (
      <FocusRing focusRingClass="focus-visible">
        <StyledLink
          {...linkProps}
          as="span"
          ref={ref}
          // maybe use clsx
          className={`${props.isDisabled ? "disabled" : ""} ${
            isPressed ? "active" : ""
          } ${props.className || ""}`}
        >
          {props.children}
        </StyledLink>
      </FocusRing>
    );
  }
);
