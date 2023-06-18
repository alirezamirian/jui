import React, { HTMLAttributes, useContext } from "react";
import { styled } from "@intellij-platform/core/styled";
import { OverlayMoveHandle } from "@intellij-platform/core/Overlay";

import { WindowContext } from "./WindowContext";
import { mergeProps } from "@react-aria/utils";

const StyledWindowTitle = styled.h1`
  margin: 0;
  text-align: center;
  font-size: 13px; // not rem! intentional
  line-height: 20px;
  cursor: default;
  user-select: none;
  padding: 0 8px;
`;

/**
 * Implements appearance of Window header, and also acts as a handle for moving the window.
 * Expected to be used with {@link WindowLayout}:
 *
 * @example
 * ```tsx
 * <ModalWindow>
 *    <WindowLayout header={<WindowHeader>header</WindowHeader>} />
 * </ModalWindow>
 * ```
 */
export const WindowHeader = ({ children }: { children?: React.ReactNode }) => {
  const { movable, titleProps } = useContext(WindowContext);
  const renderTitle = (otherProps: HTMLAttributes<HTMLElement> = {}) => (
    <StyledWindowTitle {...mergeProps(titleProps, otherProps)}>
      {children || <>&nbsp;</>}
    </StyledWindowTitle>
  );
  return movable ? (
    <OverlayMoveHandle>
      {({ moveHandleProps }) => renderTitle(moveHandleProps)}
    </OverlayMoveHandle>
  ) : (
    renderTitle()
  );
};
