import React, { ForwardedRef } from "react";
import { PressProps, usePress } from "@react-aria/interactions";
import { styled } from "@intellij-platform/core/styled";
import { UnknownThemeProp } from "@intellij-platform/core/Theme";
import { mergeProps, useObjectRef } from "@react-aria/utils";
import { useFocusable } from "@react-aria/focus";

export interface StatusBarWidgetProps extends PressProps {
  label?: React.ReactNode;
  icon?: React.ReactNode;
}

/**
 * Status bar button (aka widget), with the right hover and pressed appearance.
 * It doesn't get focused when pressed, and is excluded from tab order.
 * Disabled style is not couldn't be found, so it's skipped at the moment.
 */
export const StatusBarWidget = React.forwardRef(function StatusBarWidget(
  { label, icon, ...props }: StatusBarWidgetProps,
  forwardedRef: ForwardedRef<HTMLSpanElement>
) {
  const ref = useObjectRef(forwardedRef);
  // Maybe it's better for a11y to use useButton, or at least use button element?
  const { pressProps, isPressed } = usePress({
    ref,
    ...props,
    preventFocusOnPress: true,
  });
  const { focusableProps } = useFocusable({ excludeFromTabOrder: true }, ref);

  const StyledWrapper = label
    ? StyledStatusBarWidget
    : StyledStatusBarIconWidget;
  return (
    <StyledWrapper
      {...mergeProps(pressProps, focusableProps)}
      className={isPressed ? "pressed" : ""}
      ref={ref}
    >
      {icon}
      {icon && label && (
        <>&nbsp;</> //not the nicest way to handle spacing!
      )}
      {label}
    </StyledWrapper>
  );
});

const StyledStatusBarWidget = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) =>
    theme.inset(
      "StatusBar.Widget.widgetInsets" as UnknownThemeProp<"StatusBar.Widget.widgetInsets">
    ) ?? "0 0.375rem"};
  height: 1.125rem;
  white-space: nowrap;
  &:hover {
    background-color: ${({ theme }) =>
      theme.color(
        "StatusBar.Widget.hoverBackground" as UnknownThemeProp<"StatusBar.Widget.hoverBackground">,
        theme.color("ActionButton.hoverBackground", "#dfdfdf")
      )};
    color: ${({ theme }) =>
      theme.color(
        "StatusBar.Widget.hoverForeground" as UnknownThemeProp<"StatusBar.Widget.hoverForeground">,
        theme.commonColors.labelForeground
      )};
  }
  &.pressed {
    background-color: ${({ theme }) =>
      theme.color(
        "StatusBar.Widget.pressedBackground" as UnknownThemeProp<"StatusBar.Widget.pressedBackground">,
        theme.color("ActionButton.pressedBackground", "#cfcfcf")
      )};
    color: ${({ theme }) =>
      theme.color(
        "StatusBar.Widget.pressedForeground" as UnknownThemeProp<"StatusBar.Widget.pressedForeground">,
        theme.commonColors.labelForeground
      )};
  }
`;

const StyledStatusBarIconWidget = styled(StyledStatusBarWidget)`
  padding: ${({ theme }) =>
    theme.inset(
      "StatusBar.Widget.widgetInsets" as UnknownThemeProp<"StatusBar.Widget.widgetInsets">
    ) ?? "0 0.25rem"};
`;
