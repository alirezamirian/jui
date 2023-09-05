import { PressProps, usePress } from "@react-aria/interactions";
import React, { ForwardedRef, HTMLProps } from "react";
import { styled } from "../styled";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import { useFocusable } from "@react-aria/focus";

export interface IconButtonProps
  extends PressProps,
    // Maybe we should allow any arbitrary HTMLProps<HTMLButtonElement> props, instead of whitelisting?
    Pick<
      HTMLProps<HTMLButtonElement>,
      "onFocus" | "onBlur" | "style" | "className"
    > {
  children?: React.ReactNode;
  /**
   * The minimum width/height of the button.
   */
  minSize?: number;
  /**
   * Whether the button should be focusable by pressing tab. The default is true for icon buttons (aka. action buttons),
   * which means they are not included in the tab order.
   */
  excludeFromTabOrder?: boolean;
}

export const DEFAULT_MINIMUM_BUTTON_SIZE = 22;
export const NAVBAR_MINIMUM_BUTTON_SIZE = 20;

export const StyledIconButton = styled.button<{ minSize: number }>`
  position: relative; // to allow absolutely positioned overlays like an dropdown icon at the bottom right corner
  background: none;
  color: inherit;
  border: 1px solid transparent;
  border-radius: 3px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: ${({ minSize }) => `${minSize}px`};
  min-width: ${({ minSize }) => `${minSize}px`};
  padding: 0;
  margin: 0;
  &:disabled {
    opacity: 0.25; // not quite accurate implementation. There might be better ways to style disabled state.
  }
  &:hover:not(:disabled),
  &:focus:not(:disabled) /* in intellij platform, the button doesn't grab the focus after being active. This is not the case in web,
  for better accessibility. But there is no existing UI spec for it in intellij platform obviously. So for now, we
  fallback to the same UI as hover state. Perhaps it can be improved with a opacity or something.*/ {
    outline: none;
    background: ${({ theme }) =>
      theme.color("ActionButton.hoverBackground", "#DFDFDF")};
    border-color: ${({ theme }) =>
      theme.color("ActionButton.hoverBorderColor", "#DFDFDF")};
  }
  &:active:not(:disabled),
  &.active:not(:disabled) {
    background: ${({ theme }) =>
      theme.color("ActionButton.pressedBackground", "#CFCFCF")};
    border-color: ${({ theme }) =>
      theme.color("ActionButton.pressedBorderColor", "#CFCFCF")};
  }
`;

/**
 * Icon button, aka Action Button, in the reference implementation.
 * @see https://jetbrains.github.io/ui/controls/icon_button/
 */
export const IconButton = React.forwardRef(function IconButton(
  {
    minSize = DEFAULT_MINIMUM_BUTTON_SIZE,
    preventFocusOnPress = true,
    excludeFromTabOrder = true,
    isPressed: isPressedInput,
    isDisabled,
    onPress,
    onPressChange,
    onPressEnd,
    onPressStart,
    onPressUp,
    shouldCancelOnPointerExit,
    ...otherProps
  }: IconButtonProps,
  forwardedRef: ForwardedRef<HTMLButtonElement>
) {
  // FIXME: use useButton

  const ref = useObjectRef(forwardedRef);
  const { focusableProps } = useFocusable({ isDisabled }, ref);
  const { pressProps, isPressed } = usePress({
    ref,
    isPressed: isPressedInput,
    isDisabled,
    onPress,
    onPressChange,
    onPressEnd,
    onPressStart,
    onPressUp,
    shouldCancelOnPointerExit,
    preventFocusOnPress,
  });

  return (
    <StyledIconButton
      className={isPressed ? "active" : ""}
      disabled={isDisabled}
      {...mergeProps(pressProps, otherProps, focusableProps)}
      minSize={minSize}
      tabIndex={excludeFromTabOrder && !isDisabled ? -1 : undefined}
      ref={ref}
    />
  );
});
