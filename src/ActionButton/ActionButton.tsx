import { PressProps, usePress } from "@react-aria/interactions";
import React from "react";
import { styled } from "../styled";

interface ActionButtonProps extends PressProps {
  minSize?: number;
}

export const DEFAULT_MINIMUM_BUTTON_SIZE = 22;
export const NAVBAR_MINIMUM_BUTTON_SIZE = 20;

const StyledActionButton = styled.button<{ minSize: number }>`
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
  &:hover,
  &:focus /* in intellij platform, the button doesn't grab the focus after being active. This is not the case in web,
  for better accessibility. But there is no existing UI spec for it in intellij platform obviously. So for now, we
  fallback to the same UI as hover state. Perhaps it can be improved with a opacity or something.*/ {
    outline: none;
    background: ${({ theme }) =>
      theme.color("ActionButton.hoverBackground", "#DFDFDF")};
    border-color: ${({ theme }) =>
      theme.color("ActionButton.hoverBorderColor", "#DFDFDF")};
  }
  &:active,
  .active {
    background: ${({ theme }) =>
      theme.color("ActionButton.pressedBackground", "#CFCFCF")};
    border-color: ${({ theme }) =>
      theme.color("ActionButton.pressedBorderColor", "#CFCFCF")};
  }
`;

export const ActionButton: React.FC<ActionButtonProps> = ({
  minSize = DEFAULT_MINIMUM_BUTTON_SIZE,
  ...otherProps
}) => {
  const { pressProps } = usePress(otherProps);

  return <StyledActionButton {...pressProps} minSize={minSize} />;
};
