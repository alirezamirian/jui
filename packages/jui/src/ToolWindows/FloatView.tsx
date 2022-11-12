import { isMac } from "@react-aria/utils";
import React, { HTMLProps } from "react";
import { css } from "styled-components";
import { WINDOW_SHADOW } from "../style-constants";
import { styled } from "../styled";
import { Theme } from "../Theme/Theme";
import { FloatWindowState } from "./ToolWindowsState/ToolWindowsLayoutState";
import { WindowBounds } from "./ToolWindowsState/ToolWindowsState";
import {
  useResizableMovableWindow,
  WindowResizeHandles,
  WindowInteractionHandler,
} from "@intellij-platform/core/Window";

const StyledFloatView = styled.div`
  position: absolute;
  background: inherit;
  // border color doesn't seem to be correct and needs more investigation. might be even os-specific and outside
  // theme colors.
  border: ${({ theme }) => `1px solid ${theme.color("Component.borderColor")}`};
  ${WINDOW_SHADOW};
  ${isMac() &&
  css<{ theme: Theme }>`
    border-radius: 8px;
  `}
  z-index: 2;
`;

/**
 * Container for tool windows in float view mode. It handles some visual aspects like the border and shadow, as well as
 * UI interactions for changing the floatingBound of the tool window.
 */
export const FloatView: React.FC<
  {
    state: FloatWindowState;
    onBoundsChange: (bounds: WindowBounds) => void;
  } & Omit<HTMLProps<HTMLDivElement>, "ref" | "as">
> = ({ children, state: { bounds }, onBoundsChange, ...otherProps }) => {
  const {
    bounds: effectiveBounds,
    windowInteractionHandlerProps,
  } = useResizableMovableWindow({
    bounds,
    onBoundsChange,
  });

  return (
    <StyledFloatView
      {...otherProps}
      style={{ ...otherProps.style, ...effectiveBounds }}
    >
      <WindowInteractionHandler {...windowInteractionHandlerProps}>
        <WindowResizeHandles />
        {children}
      </WindowInteractionHandler>
    </StyledFloatView>
  );
};
