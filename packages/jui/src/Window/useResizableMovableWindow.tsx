import { useRef, useState } from "react";
import { ControlledStateProps } from "@intellij-platform/core/type-utils";
import { useControlledState } from "@react-stately/utils";
import {
  Bounds,
  WindowInteractionHandlerProps,
} from "./WindowInteractionHandler";
import { ModalWindowProps } from "@intellij-platform/core";
import { clamp } from "ramda";

export interface UseResizableMovableWindowOptions
  extends ControlledStateProps<{ bounds: Bounds }> {
  /**
   * Allows validating/intercepting bound changes during an interaction.
   */
  interceptInteraction?: (
    newBounds: Bounds,
    /**
     * Whether the interaction is a "move" or "resize" considering the initial bounds when interaction was started.
     */
    interactionType: "move" | "resize"
  ) => Bounds;
}
/**
 * TODO: description
 * TODO: rename to something better :D
 * TODO: maybe an option like ensureInViewport that would move the final bound into the viewport (if necessary), when
 *  calling onBoundsChange at the end of an interaction. That's important because if move handle(s) (usually rendered
 *  at the top of the window) are out of reach, there would be no way back.
 */
export function useResizableMovableWindow({
  bounds: boundsProp,
  defaultBounds,
  onBoundsChange,
  interceptInteraction = (i) => i,
}: UseResizableMovableWindowOptions) {
  const [bounds, setBounds] = useControlledState(
    boundsProp!,
    defaultBounds || getDefaultBounds(),
    onBoundsChange!
  );
  const initialBoundsRef = useRef<null | Bounds>(null);
  // local state of bounds for when window is in a UI interaction, like movement or resize with mouse.
  // We don't want to update the state in the higher levels repeatedly in such transactions, and we just want to
  // trigger on update when the UI interaction is done.
  // It's maintained during a UI interaction and then reset to null.
  const [
    currentInteractionBounds,
    setCurrentInteractionBounds,
  ] = useState<null | Bounds>(null);
  const onInteractionEnd = () => {
    if (currentInteractionBounds) {
      setBounds(currentInteractionBounds);
    }
    setCurrentInteractionBounds(null);
  };
  const effectiveBounds = currentInteractionBounds || bounds;
  const windowInteractionHandlerProps: WindowInteractionHandlerProps = {
    startInteraction: () => {
      setCurrentInteractionBounds(bounds);
      initialBoundsRef.current = bounds;
      return bounds;
    },
    updateBounds: (bounds) => {
      setCurrentInteractionBounds(
        interceptInteraction(
          bounds,
          bounds.width === initialBoundsRef.current?.width &&
            bounds.height === initialBoundsRef.current?.height
            ? "move"
            : "resize"
        )
      );
    },
    finishInteraction: onInteractionEnd,
  };
  return { bounds: effectiveBounds, windowInteractionHandlerProps };
}

export function getDefaultBounds(
  width: number = Math.max(window.innerWidth / 3, 300),
  height: number = Math.max(window.innerHeight / 3, 200)
): Bounds {
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
 * useResizableMovableWindow({ interceptInteraction: ensureInViewPort});
 */
export const containedWithin = (
  containerBounds: Bounds
): ModalWindowProps["interceptInteraction"] => (bounds, interactionType) => {
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
