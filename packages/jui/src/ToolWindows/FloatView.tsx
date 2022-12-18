import { isMac } from "@react-aria/utils";
import React, { HTMLProps } from "react";
import { css } from "styled-components";
import { WINDOW_SHADOW } from "../style-constants";
import { styled } from "../styled";
import { Theme } from "../Theme/Theme";
import { FloatWindowState } from "./ToolWindowsState/ToolWindowsLayoutState";
import { WindowBounds } from "./ToolWindowsState/ToolWindowsState";
import {
  useResizableMovableOverlay,
  OverlayResizeHandles,
  OverlayInteractionHandler,
} from "@intellij-platform/core/Overlay";

const FLOAT_WINDOW_MIN_WIDTH = 100;
const FLOAT_WINDOW_MIN_HEIGHT = 40; // in Intellij Platform it's zero but there is window frame which doesn't exist here

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
  const { bounds: effectiveBounds, overlayInteractionHandlerProps } =
    useResizableMovableOverlay({
      bounds,
      onBoundsChange,
    });

  return (
    <StyledFloatView
      {...otherProps}
      style={{ ...otherProps.style, ...effectiveBounds }}
    >
      <OverlayInteractionHandler {...overlayInteractionHandlerProps}>
        <OverlayResizeHandles
          minWidth={FLOAT_WINDOW_MIN_WIDTH}
          minHeight={FLOAT_WINDOW_MIN_HEIGHT}
        />
        {children}
      </OverlayInteractionHandler>
    </StyledFloatView>
  );
};
