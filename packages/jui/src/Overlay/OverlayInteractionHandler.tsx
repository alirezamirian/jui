import React, { useContext } from "react";

export type Bounds = {
  top: number;
  left: number;
  width: number;
  height: number;
};

/**
 * TODO(docs): add a few words about this abstraction and it's use.
 */
export type OverlayInteractionHandlerProps = {
  /**
   * Signals start of a UI interaction like resize or move, in which overlay bounds change.
   */
  startInteraction: (type: "move" | "resize") => Bounds;
  /**
   * Used to update bounds state during a UI interaction.
   */
  updateBounds: (bounds: Bounds) => void;
  /**
   * Signals end of a UI interaction.
   */
  finishInteraction: () => void;

  minWidth?: number;
  minHeight?: number;
};

const OverlayInteractionHandlerContext =
  React.createContext<OverlayInteractionHandlerProps | null>(null);

/**
 * Provides the context used by components like {@link OverlayMoveHandle} and {@link OverlayResizeHandles} that provide
 * user interactions that change the boundary of the overlay they are rendered in.
 * Use {@link useResizableMovableOverlay} which implements an efficient state management for overlay bounds and returns
 * props to be passed to `OverlayInteractionHandler`:
 *
 * @example
 *
 * const {
 *    bounds, // Bounds to be applied to the overlay element.
 *    overlayInteractionHandlerProps,
 *  } = useResizableMovableOverlay(props);
 *
 * return (
 *   <OverlayInteractionHandler {...overlayInteractionHandlerProps}>
 *     <div style={bounds}>...</div>
 *   </OverlayInteractionHandler>
 * );
 *
 * @see useResizableMovableOverlay
 */
export const OverlayInteractionHandler = ({
  children,
  ...props
}: OverlayInteractionHandlerProps & { children: React.ReactNode }) => {
  return (
    <OverlayInteractionHandlerContext.Provider value={props}>
      {children}
    </OverlayInteractionHandlerContext.Provider>
  );
};

export const useOverlayInteractionHandler = () =>
  useContext(OverlayInteractionHandlerContext);
