import React, {
  ButtonHTMLAttributes,
  CSSProperties,
  ForwardedRef,
} from "react";
import { useButton } from "@react-aria/button";
import { AriaButtonProps } from "@react-types/button";
import { filterDOMProps, mergeProps, useObjectRef } from "@react-aria/utils";
import {
  StyledButton,
  StyledDefaultButton,
  StyledIconButton,
} from "@intellij-platform/core/Button/StyledButton";
import { MnemonicTrigger } from "@intellij-platform/core/Mnemonic";
import { PressEvent } from "@react-types/shared/src/events";

type ButtonVariant = "default" | "icon";
export interface ButtonProps extends AriaButtonProps {
  variant?: ButtonVariant; // can allow for custom (styled) component too if needed.
  // NOTE: there is a chance of unchecked breaking change here, since this is not explicitly mentioned as public API
  // of useButton, but it is passed to the underlying usePress.
  // Should this be become true by default? Maybe an context-based API to set defaults like this for a section?
  preventFocusOnPress?: boolean;

  form?: ButtonHTMLAttributes<HTMLButtonElement>["form"];
  style?: CSSProperties;
  /**
   * A character to be used as {@link https://jetbrains.design/intellij/principles/mnemonics/ mnemonic} for the button
   * It will be shown as underlined in button text, when mnemonic is activated (by pressing Alt)
   * Note: if you use mnemonic, and the direct child of the button is not a string, you should use `MnemonicText`
   * to render the button text, to have the underlining behavior.
   */
  mnemonic?: string;
  className?: string;

  /**
   * Called when the button is pressed, or triggered via mnemonic. If mnemonic is used, there won't be any event
   * passed to onPress callback.
   */
  onPress?: (e?: PressEvent) => void;
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
  { variant, style, className, mnemonic, ...props }: ButtonProps,
  forwardedRef: ForwardedRef<HTMLButtonElement>
) {
  const ref = useObjectRef(forwardedRef);
  const { buttonProps } = useButton(props, ref);
  const domProps = filterDOMProps(props);
  const { autoFocus, form } = props;

  const Component = (variant && variants[variant]) || StyledButton;
  return (
    <Component
      {...mergeProps(domProps, buttonProps, { autoFocus, form })}
      style={style}
      className={className}
      ref={ref}
    >
      {mnemonic ? (
        <MnemonicTrigger
          mnemonic={mnemonic}
          isDisabled={props.isDisabled}
          onTriggered={props.onPress}
        >
          {props.children}
        </MnemonicTrigger>
      ) : (
        props.children
      )}
    </Component>
  );
});
