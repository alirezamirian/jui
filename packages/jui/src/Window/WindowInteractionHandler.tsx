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
export type WindowInteractionHandlerProps = {
  /**
   * Signals start of a UI interaction like resize or move, in which window bounds change.
   */
  startInteraction: () => Bounds;
  /**
   * Used to update bounds state during a UI interaction.
   */
  updateBounds: (bounds: Bounds) => void;
  /**
   * Signals end of a UI interaction.
   */
  finishInteraction: () => void;
};

const WindowInteractionHandlerContext =
  React.createContext<WindowInteractionHandlerProps | null>(null);

/**
 * Provides the context used by components like {@link WindowMoveHandle} and {@link WindowResizeHandles} that provide
 * user interactions that change the boundary of the window they are rendered in.
 * Use {@link useResizableMovableWindow} which implements an efficient state management for window bounds and returns
 * props to be passed to `WindowInteractionHandler`:
 *
 * @example
 *
 * const {
 *    bounds, // Bounds to be applied to the window element.
 *    windowInteractionHandlerProps,
 *  } = useResizableMovableWindow(props);
 *
 * return (
 *   <WindowInteractionHandler {...windowInteractionHandlerProps}>
 *     <div style={effectiveBounds}>...</div>
 *   </WindowInteractionHandler>
 * );
 *
 * @see useResizableMovableWindow
 */
export const WindowInteractionHandler = ({
  children,
  ...props
}: WindowInteractionHandlerProps & { children: React.ReactNode }) => {
  return (
    <WindowInteractionHandlerContext.Provider value={props}>
      {children}
    </WindowInteractionHandlerContext.Provider>
  );
};

export const useWindowInteractionHandler = () =>
  useContext(WindowInteractionHandlerContext);
