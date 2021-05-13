import React, { ReactNode, useContext } from "react";
import { usePress } from "@react-aria/interactions";
import { StyledToolWindowStripeButton } from "./StyledToolWindowStripeButton";
import { ToolWindowStripeContext } from "./ToolWindowStripe";

interface ToolWindowStripeButtonProps {
  active?: boolean;
  disabled?: boolean;
  onToggle?: (active: boolean) => void;
  children: ReactNode;
}

export function ToolWindowStripeButton({
  active,
  children,
  disabled,
  onToggle,
}: ToolWindowStripeButtonProps) {
  const context = useContext(ToolWindowStripeContext);
  const { pressProps } = usePress({
    onPress: () => {
      if (active) {
        onToggle?.(!active);
      }
    },
    isDisabled: disabled,
  });
  if (!context) {
    throw new Error(
      "ToolWindowStripeButton is meant to be used inside ToolWindowStripe"
    );
  }
  return (
    <StyledToolWindowStripeButton
      anchor={context.anchor}
      active={active}
      {...pressProps}
    >
      {children}
    </StyledToolWindowStripeButton>
  );
}
