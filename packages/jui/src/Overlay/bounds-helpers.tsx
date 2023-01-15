import { Bounds } from "@intellij-platform/core/Overlay/OverlayInteractionHandler";
import { clamp } from "ramda";
import { ResizableMovableOverlayOptions } from "@intellij-platform/core/Overlay/useResizableMovableOverlay";

export const withMinSize =
  ({ width: minWidth, height: minHeight }: { width: number; height: number }) =>
  (bounds: Bounds) => {
    const width = Math.max(minWidth, bounds.width);
    const height = Math.max(minHeight, bounds.height);
    if (bounds.width != width || bounds.height != height) {
      return { ...bounds, width, height };
    }
    return bounds;
  };

export function getCenteredBounds(width: number, height: number): Bounds {
  return {
    left: (window.innerWidth - width) / 2,
    top: (window.innerHeight - height) / 2,
    width,
    height,
  };
}

/**
 * A helper function to create interaction interceptor which ensures bounds are contained within a container.
 *
 * @example
 * const ensureInViewPort = containedWithin({left: 0, top: 0, width: window.innerWidth, height: window.innerHeight})
 *
 * useResizableMovableOverlay({ onBoundsChanging: ensureInViewPort});
 */
export const containedWithin =
  (
    containerBounds: Bounds
  ): ResizableMovableOverlayOptions["onBoundsChanging"] =>
  (bounds, interactionType) => {
    if (interactionType === "move") {
      const left = clamp(
        containerBounds.left,
        containerBounds.left + containerBounds.width - bounds.width,
        bounds.left
      );
      const top = clamp(
        containerBounds.top,
        containerBounds.top + containerBounds.height - bounds.height,
        bounds.top
      );
      return {
        ...bounds,
        left,
        top,
      };
    } else if (interactionType === "resize") {
      const left = Math.max(containerBounds.left, bounds.left);
      const top = Math.max(containerBounds.top, bounds.top);
      // the logic here seems unnecessarily complicated
      return {
        left,
        top,
        width:
          bounds.width -
          Math.max(
            0,
            bounds.left +
              bounds.width -
              (containerBounds.left + containerBounds.width)
          ) -
          (left - bounds.left),
        height:
          bounds.height -
          Math.max(
            0,
            bounds.top +
              bounds.height -
              (containerBounds.top + containerBounds.height)
          ) -
          (top - bounds.top),
      };
    }
    return bounds;
  };
export const position =
  ({
    targetElement,
    placement = "bottom",
  }: {
    placement?: "bottom" | "top";
    targetElement: HTMLElement;
  }) =>
  ({ height, width }: Bounds): Bounds => {
    const targetBounds = targetElement.getBoundingClientRect();
    return {
      left: targetBounds.left,
      top:
        placement === "bottom"
          ? targetBounds.top + targetBounds.height
          : targetBounds.top - height,
      width,
      height,
    };
  };

export function ensureInViewport(
  bounds: Bounds,
  { gap = 5 }: { gap?: number } = {}
): Bounds {
  const viewportWidth = window.innerWidth - gap;
  const viewportHeight = window.innerHeight - gap;
  const distanceToRightEdge = viewportWidth - (bounds.left + bounds.width);
  const distanceToBottomEdge = viewportHeight - (bounds.top + bounds.height);
  if (distanceToRightEdge < 0 || distanceToBottomEdge < 0) {
    return {
      left: bounds.left + Math.min(distanceToRightEdge, 0),
      top: bounds.top + Math.min(distanceToBottomEdge, 0),
      width: bounds.width,
      height: bounds.height,
    };
  } else {
    return {
      left: Math.max(bounds.left, 0),
      top: Math.max(bounds.top, 0),
      width: bounds.width,
      height: bounds.height,
    };
  }
}
