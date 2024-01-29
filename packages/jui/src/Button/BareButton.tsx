import React, { ForwardedRef, JSXElementConstructor } from "react";
import { useButton } from "@react-aria/button";
import { filterDOMProps, mergeProps, useObjectRef } from "@react-aria/utils";
import { AriaBaseButtonProps, ButtonProps } from "@react-types/button";

export interface BareButtonProps extends AriaBaseButtonProps, ButtonProps {
  children: React.ReactElement;

  // NOTE: there is a chance of unchecked breaking change here, since this is not explicitly mentioned as public API
  // of useButton, but it is passed to the underlying usePress.
  preventFocusOnPress?: boolean; // Should this be become true by default?
}

/**
 * A component to make arbitrary content an accessible button which is also able to be a tooltip trigger.
 */
export const BareButton: React.FC<BareButtonProps> = React.forwardRef(
  function BareButton(props: BareButtonProps, ref: ForwardedRef<HTMLElement>) {
    const elementType = React.isValidElement(props.children)
      ? (props.children.type as JSXElementConstructor<unknown>)
      : undefined;
    const { buttonProps } = useButton(
      {
        elementType,
        ...props,
      },
      useObjectRef(ref)
    );
    const domProps = filterDOMProps(props);
    const { autoFocus } = props;

    return React.cloneElement(
      props.children,
      mergeProps(domProps, buttonProps, { autoFocus, ref })
    );
  }
);
