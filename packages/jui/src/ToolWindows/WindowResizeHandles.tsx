import React, { useContext, useRef } from "react";
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
import { WindowBounds } from "./ToolWindowsState/ToolWindowsState";

const FLOAT_WINDOW_MIN_WIDTH = 100;
const FLOAT_WINDOW_MIN_HEIGHT = 40; // in Intellij Platform it's zero but there is window frame which doesn't exist here
/**
 * NOTE: can be used in other kinds of resizable overlays too, in future.
 */
export function WindowResizeHandles() {
  const windowResizer = useWindowResizer();
  return (
    windowResizer && (
      <>
        <RightResizer {...windowResizer.getResizerProps("right")} />
        <LeftResizer {...windowResizer.getResizerProps("left")} />
        <TopResizer {...windowResizer.getResizerProps("top")} />
        <BottomResizer {...windowResizer.getResizerProps("bottom")} />
      </>
    )
  );
}

/**
 * TODO(docs): add a few words about this abstraction and it's use.
 */
export type BoundsInteractionHandlerProps = {
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
export const WindowInteractionHandlerContext =
  React.createContext<BoundsInteractionHandlerProps | null>(null);
export const useWindowInteractionHandler = () =>
  useContext(WindowInteractionHandlerContext);

/**
 * window resizing logic and state. When resizing is in progress, the source of truth is a local state, for performance
 * reasons. When the resize is done (e.g. by mouse being released), `onBoundsChange` is called with the new bounds.
 */
function useWindowResizer() {
  const initialBoundsRef = useRef<WindowBounds>({
    top: 0,
    height: 0,
    width: 0,
    left: 0,
  });
  const interactionHandler = useWindowInteractionHandler();
  if (!interactionHandler) {
    return null;
  }
  const { finishInteraction, startInteraction, updateBounds } =
    interactionHandler;

  const onResize = {
    right: (size: number) =>
      updateBounds({
        ...initialBoundsRef.current,
        width: Math.max(
          FLOAT_WINDOW_MIN_WIDTH,
          initialBoundsRef.current.width + size
        ),
      }),
    bottom: (size: number) =>
      updateBounds({
        ...initialBoundsRef.current,
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
      return updateBounds({
        ...initialBounds,
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
      return updateBounds({
        ...initialBounds,
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
        initialBoundsRef.current = startInteraction();
      },
      onResize: onResize[side],
      onResizeEnd: finishInteraction,
      style: { position: "absolute", [side]: 0 },
    };
  }

  return {
    getResizerProps,
  };
}
