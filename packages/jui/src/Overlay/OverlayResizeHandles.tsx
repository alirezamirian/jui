import React, { useRef } from "react";
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
import {
  Bounds,
  useOverlayInteractionHandler,
} from "./OverlayInteractionHandler";

type OverlayResizeHandlesProps = {
  minWidth?: number;
  minHeight?: number;
};

/**
 * Renders invisible resize handles at the edges of the overlay it's rendered in. It uses the context provided by
 * {@link OverlayInteractionHandler} to resize the overlay when the handles are used.
 */
export function OverlayResizeHandles(props: OverlayResizeHandlesProps) {
  const overlayResizer = useOverlayResizer(props);
  return (
    overlayResizer && (
      <>
        <RightResizer {...overlayResizer.getResizerProps("right")} />
        <LeftResizer {...overlayResizer.getResizerProps("left")} />
        <TopResizer {...overlayResizer.getResizerProps("top")} />
        <BottomResizer {...overlayResizer.getResizerProps("bottom")} />
      </>
    )
  );
}

/**
 * overlay resizing logic and state. When resizing is in progress, the source of truth is a local state, for performance
 * reasons. When the resize is done (e.g. by mouse being released), `onBoundsChange` is called with the new bounds.
 */
function useOverlayResizer({
  minWidth = 1,
  minHeight = 1,
}: OverlayResizeHandlesProps = {}) {
  const initialBoundsRef = useRef<Bounds>({
    top: 0,
    height: 0,
    width: 0,
    left: 0,
  });
  const interactionHandler = useOverlayInteractionHandler();
  if (!interactionHandler) {
    return null;
  }
  const { finishInteraction, startInteraction, updateBounds } =
    interactionHandler;

  const onResize = {
    right: (size: number) =>
      updateBounds({
        ...initialBoundsRef.current,
        width: Math.max(minWidth, initialBoundsRef.current.width + size),
      }),
    bottom: (size: number) =>
      updateBounds({
        ...initialBoundsRef.current,
        height: Math.max(minHeight, initialBoundsRef.current.height + size),
      }),
    left: (size: number) => {
      const newWidth = Math.max(
        minWidth,
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
        minHeight,
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
