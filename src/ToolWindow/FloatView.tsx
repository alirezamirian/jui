import { isMac } from "@react-aria/utils";
import React, { HTMLProps, useContext, useState } from "react";
import { css } from "styled-components";
import { MAC_WINDOW_SHADOW } from "../style-constants";
import { styled } from "../styled";
import { Theme } from "../Theme/Theme";
import { FloatWindowState } from "./ToolWindowsState/ToolWindowsLayoutState";
import { WindowBounds } from "./ToolWindowsState/ToolWindowsState";
import { WindowResizeHandles } from "./WindowResizeHandles";

/**
 * TODO(docs): add a few words about this abstraction and it's use.
 */
type BoundsInteractionHandlerProps = {
  /**
   * Signals start of a UI interaction like resize or move, in which window bounds change.
   */
  startInteraction: () => WindowBounds;
  /**
   * Used to update bounds state during a UI interaction.
   */
  updateBounds: (bounds: WindowBounds) => void;
  /**
   * Signals end of a UI interaction.
   */
  finishInteraction: () => void;
};

const throwMissingProviderError = () => {
  throw new Error("WindowInteractionHandlerContext not provided");
};

const WindowInteractionHandlerContext = React.createContext<BoundsInteractionHandlerProps>(
  {
    updateBounds: throwMissingProviderError,
    finishInteraction: throwMissingProviderError,
    startInteraction: throwMissingProviderError,
  }
);

export const useWindowInteractionHandler = () =>
  useContext(WindowInteractionHandlerContext);

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

/**
 * Container for tool windows in float view mode. It handles some visual aspects like the border and shadow, as well as
 * UI interactions for changing the floatingBound of the tool window.
 * @param children
 * @param bounds
 * @param onBoundsChange
 * @constructor
 */
export const FloatView: React.FC<
  {
    state: FloatWindowState;
    onBoundsChange: (bounds: WindowBounds) => void;
  } & Omit<HTMLProps<HTMLDivElement>, "ref" | "as">
> = ({
  children,
  state: { bounds: boundsProp },
  onBoundsChange,
  ...otherProps
}) => {
  // local state of bounds for when window is in a UI interaction, like movement or resize with mouse.
  // We don't want to update toolWindowsState repeatedly in such transactions and we just want to trigger one
  // update when the UI interaction is done.
  // it's maintained during a UI interaction and then reset to null.
  const [bounds, setBounds] = useState<null | WindowBounds>(null);
  const onInteractionEnd = () => {
    if (bounds) {
      onBoundsChange(bounds);
    }
    setBounds(null);
  };
  const effectiveBounds = bounds || boundsProp;
  const boundsContextValue: BoundsInteractionHandlerProps = {
    startInteraction: () => {
      setBounds(boundsProp);
      return boundsProp;
    },
    updateBounds: setBounds,
    finishInteraction: onInteractionEnd,
  };

  return (
    <StyledFloatView
      {...otherProps}
      style={{ ...otherProps.style, ...effectiveBounds }}
    >
      <WindowInteractionHandlerContext.Provider value={boundsContextValue}>
        <WindowResizeHandles />
        {children}
      </WindowInteractionHandlerContext.Provider>
    </StyledFloatView>
  );
};
