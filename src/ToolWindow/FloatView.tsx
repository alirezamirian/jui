import { isMac } from "@react-aria/utils";
import React, { useRef, useState } from "react";
import { css } from "styled-components";
import {
  BottomResizer,
  LeftResizer,
  RightResizer,
  TopResizer,
} from "../Resizer";
import {
  HorizontalResizerProps,
  VerticalResizerProps,
} from "../Resizer/ResizerProps";
import { MAC_WINDOW_SHADOW } from "../style-constants";
import { styled } from "../styled";
import { Theme } from "../Theme/Theme";
import { FloatWindowState } from "./ToolWindowsState/ToolWindowsLayoutState";
import { WindowBounds } from "./ToolWindowsState/ToolWindowsState";

const StyledFloatView = styled.div`
  position: absolute;
  background: inherit;
  // border color doesn't seem to be correct and needs more investigation. might be even os-specific and outside
  // theme colors.
  border: ${({ theme }) => `1px solid ${theme.color("Component.borderColor")}`};
  ${isMac() &&
  css<{ theme: Theme }>`
    ${MAC_WINDOW_SHADOW};
    border-radius: 8px;
  `}
  z-index: 2;
`;
const FLOAT_WINDOW_MIN_WIDTH = 100;
const FLOAT_WINDOW_MIN_HEIGHT = 40; // in Intellij Platform it's zero but there is window frame which doesn't exist here

/**
 * Container for tool windows in float view mode. It handles some visual aspects like the border and shadow, as well as
 * UI interactions for changing the floatingBound of the tool window.
 * @param children
 * @param bounds
 * @param onBoundsChange
 * @constructor
 */
export const FloatView: React.FC<{
  state: FloatWindowState;
  onBoundsChange: (bounds: WindowBounds) => void;
}> = ({ children, state: { bounds }, onBoundsChange }) => {
  const {
    bounds: { width, height, top, left },
    getResizerProps,
  } = useWindowResizer({ bounds, onBoundsChange });

  return (
    <StyledFloatView style={{ width, height, top, left }}>
      <RightResizer {...getResizerProps("right")} />
      <LeftResizer {...getResizerProps("left")} />
      <TopResizer {...getResizerProps("top")} />
      <BottomResizer {...getResizerProps("bottom")} />
      {children}
    </StyledFloatView>
  );
};

/**
 * window resizing logic and state. When resizing is in progress, the source of truth is a local state, for performance
 * reasons. When the resize is done (e.g. by mouse being released), `onBoundsChange` is called with the new bounds.
 */
function useWindowResizer({
  onBoundsChange,
  bounds: boundsProp,
}: {
  bounds: WindowBounds;
  onBoundsChange: (newBounds: WindowBounds) => void;
}) {
  // local state of bounds for when window is in a UI interaction, like movement or resize with mouse.
  // We don't want to update toolWindowsState repeatedly in such transactions and we just want to trigger one
  // update when the UI interaction is done.
  // it's maintained during a UI interaction and then reset to null.
  const [bounds, setBounds] = useState<null | WindowBounds>(null);
  const initialBoundsRef = useRef<WindowBounds>(boundsProp);
  const { top, left, width, height } = bounds || boundsProp;

  const onResize = {
    right: (size: number) =>
      setBounds({
        ...bounds!,
        width: Math.max(
          FLOAT_WINDOW_MIN_WIDTH,
          initialBoundsRef.current.width + size
        ),
      }),
    bottom: (size: number) =>
      setBounds({
        ...bounds!,
        height: Math.max(
          FLOAT_WINDOW_MIN_HEIGHT,
          initialBoundsRef.current.height + size
        ),
      }),
    left: (size: number) => {
      const newWidth = Math.max(
        FLOAT_WINDOW_MIN_WIDTH,
        initialBoundsRef.current.width + size
      );
      const initialBounds = initialBoundsRef.current;
      return setBounds({
        ...bounds!,
        left: initialBounds.left + initialBounds.width - newWidth,
        width: newWidth,
      });
    },
    top: (size: number) => {
      const newHeight = Math.max(
        FLOAT_WINDOW_MIN_WIDTH,
        initialBoundsRef.current.height + size
      );
      const initialBounds = initialBoundsRef.current;
      return setBounds({
        ...bounds!,
        top: initialBounds.top + initialBounds.height - newHeight,
        height: newHeight,
      });
    },
  };

  function getResizerProps(side: "left" | "right"): HorizontalResizerProps;
  function getResizerProps(side: "top" | "bottom"): VerticalResizerProps;
  function getResizerProps(
    side: "left" | "right" | "top" | "bottom"
  ): HorizontalResizerProps | VerticalResizerProps {
    const horizontal = side === "left" || side === "right";
    return {
      size: 1,
      cursor: horizontal ? "ew" : "ns",
      onResizeStarted: () => {
        const initialBounds = { width, height, top, left };
        setBounds(initialBounds);
        initialBoundsRef.current = initialBounds;
      },
      onResize: onResize[side],
      onResizeEnd: () => {
        if (bounds) {
          onBoundsChange(bounds);
        }
        setBounds(null);
      },
      style: { position: "absolute", [side]: 0 },
    };
  }

  return {
    getResizerProps,
    bounds: { top, left, width, height },
  };
}
