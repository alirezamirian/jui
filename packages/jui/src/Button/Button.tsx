import React, { ForwardedRef } from "react";
import { useButton } from "@react-aria/button";
import { AriaButtonProps } from "@react-types/button";
import { filterDOMProps, mergeProps, useObjectRef } from "@react-aria/utils";
import {
  StyledButton,
  StyledDefaultButton,
  StyledIconButton,
} from "@intellij-platform/core/Button/StyledButton";

type ButtonVariant = "default" | "icon";
export interface ButtonProps extends AriaButtonProps {
  variant?: ButtonVariant; // can allow for custom (styled) component too if needed.
  // NOTE: there is a chance of unchecked breaking change here, since this is not explicitly mentioned as public API
  // of useButton, but it is passed to the underlying usePress.
  preventFocusOnPress?: boolean; // Should this be become true by default?
}

const variants: { [key in ButtonVariant]: typeof StyledButton } = {
  default: StyledDefaultButton,
  icon: StyledIconButton,
};

/**
 * https://jetbrains.github.io/ui/controls/button/
 *
 * TODO:
 * - Support for "default" button behaviour. it's kind of similar to a <button type="submit" /> in html, but textarea
 * behaviour is different from what is explained here: https://jetbrains.github.io/ui/controls/button/#16
 * Cmd+Enter should always trigger onPress. Plus, maybe it should work independent of "form" being used? or maybe it's
 * not a big deal to expect an ancestor "form" element, when variant is "default"?
 * - Support for mnemonic
 * - "Default" style differences in Windows.
 * - Gradient colors (low hanging fruit, but negligible added value).
 *
 * Known issues:
 * - In the original impl, default button looks the same as normal button, when focus is not within the same area that
 * the button is. For example in the commit tool window, "Commit" button which is default, is not blue, unless the
 * "Commit" tool window is focused. This particular case can easily be achieved by conditionally setting variant to,
 * "default" based on tool window focus state, which is accessible via useDefaultToolWindowContext(), if
 * DefaultToolWindow is used. But we need to see if the same requirement exists in various places.
 * NOTE: this item is related to the first item in the to-do list above. There can be a container kind of component,
 * which enables "default" behaviour and look. Maybe it can be FocusScope or at least related to FocusScope.
 * - In the original impl, there is no visual clue for pressed state, which is poor accessibility. For now, the same
 * behaviour is followed here too. But we may reconsider deviating from the original impl for an improvement here.
 *
 */
export const Button: React.FC<ButtonProps> = React.forwardRef(function Button(
  { variant, ...props }: ButtonProps,
  forwardedRef: ForwardedRef<HTMLButtonElement>
) {
  const ref = useObjectRef(forwardedRef);
  const { buttonProps } = useButton(props, ref);
  const domProps = filterDOMProps(props);
  const { autoFocus } = props;

  const Component = (variant && variants[variant]) || StyledButton;
  return (
    <Component {...mergeProps(domProps, buttonProps, { autoFocus })} ref={ref}>
      {props.children}
    </Component>
  );
});
