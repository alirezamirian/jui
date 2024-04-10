import React, { CSSProperties, HTMLAttributes, useContext } from "react";
import { mergeProps } from "@react-aria/utils";

import { styled } from "@intellij-platform/core/styled";
import { UnknownThemeProp } from "@intellij-platform/core/Theme";
import { OverlayMoveHandle } from "@intellij-platform/core/Overlay";

import { PopupContext } from "./PopupContext";

const StyledPopupHeader = styled.div<{
  active?: boolean;
  hasControls?: boolean;
}>`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 1.5rem;
  min-height: ${({ hasControls }) => hasControls && "1.75rem"};
  cursor: default;
  white-space: nowrap;
  color: ${({ theme, active }) =>
    active
      ? theme.color(
          "Popup.Header.activeForeground" as UnknownThemeProp<"Popup.Header.activeForeground">,
          theme.commonColors.labelForeground
        )
      : theme.color(
          "Popup.Header.inactiveForeground" as UnknownThemeProp<"Popup.Header.inactiveForeground">,
          theme.commonColors.labelDisabledForeground
        )};
  background-color: ${({ theme, active }) =>
    active
      ? theme.color("Popup.Header.activeBackground", "#e6e6e6")
      : theme.color("Popup.Header.inactiveBackground", `#ededed`)};
`;
/**
 * Implements appearance of
 * [Popup Header](https://www.figma.com/file/nfDfMAdV7j2fnQlpYNAOfP/IntelliJ-Platform-UI-Kit-%28Community%29?node-id=75455%3A26566&t=Hzwse5j5R6iCEzVW-4),
 * and also acts as a handle for moving the panel.
 * Expected to be used with {@link Popup#Layout}:
 *
 * @example
 * ```tsx
 * <Popup>
 *    <Popup.Layout header={<Popup.Header>header</Popup.Header>} />
 * </Popup>
 * ```
 */
export const PopupHeader = ({
  children,
  hasControls,
  className,
  style,
}: {
  children?: React.ReactNode;
  hasControls?: boolean;
  className?: string;
  style?: CSSProperties;
}) => {
  const { isActive, movable, titleProps } = useContext(PopupContext);
  const renderHeader = (otherProps: HTMLAttributes<HTMLElement> = {}) => (
    <StyledPopupHeader
      active={isActive}
      hasControls={hasControls}
      className={className}
      style={style}
      {...mergeProps(titleProps, otherProps)}
    >
      {children}
    </StyledPopupHeader>
  );
  return movable ? (
    <OverlayMoveHandle>
      {({ moveHandleProps }) => renderHeader(moveHandleProps)}
    </OverlayMoveHandle>
  ) : (
    renderHeader()
  );
};
