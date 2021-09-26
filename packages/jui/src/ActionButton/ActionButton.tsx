import { PressProps, usePress } from "@react-aria/interactions";
import React, { ForwardedRef } from "react";
import { styled } from "../styled";

interface ActionButtonProps extends PressProps {
  children?: React.ReactNode;
  minSize?: number;
}

export const DEFAULT_MINIMUM_BUTTON_SIZE = 22;
export const NAVBAR_MINIMUM_BUTTON_SIZE = 20;

export const StyledActionButton = styled.button<{ minSize: number }>`
  background: none;
  color: inherit;
  border: 1px solid transparent;
  border-radius: 2px;
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
  .active {
    background: ${({ theme }) =>
      theme.color("ActionButton.pressedBackground", "#CFCFCF")};
    border-color: ${({ theme }) =>
      theme.color("ActionButton.pressedBorderColor", "#CFCFCF")};
  }
`;

export const ActionButton = React.forwardRef(function ActionButton(
  { minSize = DEFAULT_MINIMUM_BUTTON_SIZE, ...otherProps }: ActionButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const { pressProps } = usePress(otherProps);

  return (
    <StyledActionButton
      disabled={otherProps.isDisabled}
      {...pressProps}
      minSize={minSize}
      ref={ref}
    />
  );
});
