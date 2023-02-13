import React, { RefObject, useState } from "react";
import { useControlledState } from "@react-stately/utils";
import {
  Bounds,
  OverlayInteractionHandlerProps,
} from "./OverlayInteractionHandler";
import { clamp } from "ramda";
import { useContentSize } from "@intellij-platform/core/Overlay/useContentSize";
import {
  getCenteredBounds,
  withMinSize,
} from "@intellij-platform/core/Overlay/bounds-helpers";

/**
 * Common props for resizable and movable overlays such as Windows or Popups.
 * There is currently no corresponding component/hook, and this is just a type helper.
 */
export interface ResizableMovableOverlayOptions {
  onBoundsChange?: (bounds: Bounds, interactionType: "move" | "resize") => void;
  /**
   * For performance reason, overlay bounds is kept in a local state during a resize or move interaction, and
   * `onBoundsChange` is called once at the end of interaction. `onBoundsChanging` gives a chance of rectifying
   * bounds changes during an interaction to for example apply custom size/placement constraints.
   */
  onBoundsChanging?: (
    newBounds: Bounds,
    /**
     * Whether the interaction is a "move" or "resize" considering the initial bounds when interaction was started.
     */
    interactionType: "move" | "resize"
  ) => Bounds;
  /**
   * Controlled bounds. Can be a partially specified bounds.
   * - If `top` not specified, the returned bounds will be centered vertically.
   * - If `left` not specified, the returned bounds will be centered horizontally.
   * - If `width` not specified, the width of the bounds will be based on content width.
   * - If `height` not specified, the height of the bounds will be based on content height.
   * Note that regardless of `bounds`, `onBoundsChange` always receives a full `bounds` object which is solely
   * based on the bounds of the overlay, at the end of an interaction.
   */
  bounds?: Partial<Bounds>;
  /**
   * Default bounds in uncontrolled mode. Can be a partially specified bounds.
   * - If `top` not specified, the returned bounds will be centered vertically.
   * - If `left` not specified, the returned bounds will be centered horizontally.
   * - If `width` not specified, the width of the bounds will be based on content width.
   * - If `height` not specified, the height of the bounds will be based on content height.
   * Note that regardless of `defaultBounds`, `onBoundsChange` always receives a full `bounds` object which is solely
   * based on the bounds of the overlay, at the end of an interaction.
   */
  defaultBounds?: Partial<Bounds>;
  minWidth?: number | "content"; // TODO: support function, receiving measured size, for more flexibility
  minHeight?: number | "content"; // TODO: support function, receiving measured size, for more flexibility

  /**
   * Allowed interactions:
   * - "all": both resizable and movable
   * - "move": movable, but not resizable
   * - "none": fixed size and position
   * The reason there are no `resizable` and `movable` boolean props is that resizable=true,movable=false doesn't make
   * sense from UX perspective.
   * @default "all"
   */
  interactions?: "all" | "move" | "none"; // FIXME: it's not used in useResizableMovableOverlay, maybe separate props?

  /**
   * When the size is not specified by `bounds` or `defaultBounds` props, the content size is measured and used in the
   * returned bounds. By default, the content size is measured initially. If `observeContentSize` is true, the DOM
   * mutations will be observed and the content is re-measured as changes are observed.
   */
  observeContentResize?: boolean;
}
/**
 *
 * TODO: rename to something better? :D
 * TODO: maybe an option like ensureInViewport that would move the final bound into the viewport (if necessary), when
 *  calling onBoundsChange at the end of an interaction. That's important because if move handle(s) (usually rendered
 *  at the top of the overlay) are out of reach, there would be no way back.
 * TODO: description
 * Assumptions:
 * - The overlay is rendered in a portal, and with position "fixed".
 * - The returned bounds should be used to style the overlay.
 *   - There shouldn't be other style affecting the positioning, such as margin, or transform.
 *   - If the overlay has border, box-sizing should be "border-box"
 */
export function useResizableMovableOverlay(
  overlayRef: RefObject<HTMLElement>,
  {
    bounds: inputBounds,
    defaultBounds,
    onBoundsChange,
    onBoundsChanging = (i) => i,
    minWidth,
    minHeight,
    observeContentResize,
  }: ResizableMovableOverlayOptions
): {
  /**
   * The bounds to be applied as `style` on the overlay, to position it. Even if the input `bounds` or `defaultBounds`
   * is not defined, returned `bounds` is always a full bounds object. This eliminates any other need for styling,
   * if the input bounds doesn't define size or position.
   * NOTE: even when the size is not specified as input, and is to be based on content, the returned `bounds` include
   * explicit, size, measured **after the first render**. This is because overlays such as windows are not expected to
   * be resized without user interaction, and just based on the content size change. So we make sure even when the
   * sizing is based on content, it's stable. If imperative re-measure of the size is needed, or even dynamic resizing
   * based on content is needed in some cases, it is feasible to add it as an option.
   */
  bounds: Bounds;
  /**
   * `true` if the returned bounds has explicit position. `false` if it's centered as a fallback.
   */
  positioned: boolean;
  /**
   * `true` if the returned bounds has explicit size. `false` if it's measured based on content.
   */
  sized: boolean;
  /**
   * Props to be passed to {@link OverlayInteractionHandler}
   */
  overlayInteractionHandlerProps: OverlayInteractionHandlerProps;
} {
  const [bounds, setBounds] = useControlledState<Partial<Bounds> | undefined>(
    inputBounds!,
    defaultBounds!,
    // onBoundsChange is called with Bounds object. Not Partial<Bounds>, and not undefined.
    onBoundsChange as (
      value: Partial<Bounds> | undefined,
      reason: "resize" | "move"
    ) => void
  );
  const [contentSize] = useContentSize(overlayRef, {
    observe: observeContentResize,
  });
  // local state of bounds for when the overlay is in a UI interaction, like movement or resize with mouse.
  // We don't want to update the state in the higher levels repeatedly in such transactions, and we just want to
  // trigger on update when the UI interaction is done.
  // It's maintained during a UI interaction and then reset to null.
  const [currentInteraction, setCurrentInteraction] = useState<null | {
    type: "move" | "resize";
    bounds: Bounds;
  }>(null);

  const effectiveMinWidth =
    minWidth === "content" ? contentSize.width : minWidth || 0;
  const effectiveMinHeight =
    minHeight === "content" ? contentSize.height : minHeight || 0;
  const applyMinSize = withMinSize({
    width: effectiveMinWidth,
    height: effectiveMinHeight,
  });
  const overlayInteractionHandlerProps: OverlayInteractionHandlerProps = {
    startInteraction: (type: "move" | "resize") => {
      if (!overlayRef.current) {
        throw new Error(
          "overlayRef value is not set. Make sure to have the ref passed to the resizable/movable overlay"
        );
      }
      const bounds = getBounds(overlayRef.current);
      setCurrentInteraction({ bounds, type });
      return bounds;
    },
    updateBounds: (updatedBounds) => {
      setCurrentInteraction((currentInteraction) => {
        if (currentInteraction) {
          const { type } = currentInteraction;
          return {
            type,
            bounds: onBoundsChanging(updatedBounds, type) || updatedBounds,
          };
        }
        return currentInteraction;
      });
    },
    finishInteraction: () => {
      if (currentInteraction && overlayRef.current) {
        setBounds(getBounds(overlayRef.current), currentInteraction.type);
      }
      setCurrentInteraction(null);
    },
    minWidth: effectiveMinWidth,
    minHeight: effectiveMinHeight,
  };

  const partialBounds = currentInteraction?.bounds ?? bounds;
  const centeredContentBounds = getCenteredBounds(
    clamp(
      effectiveMinWidth,
      window.innerWidth,
      bounds?.width ?? contentSize.width
    ),
    clamp(
      effectiveMinHeight,
      window.innerHeight,
      bounds?.height ?? contentSize.height
    )
  );
  return {
    positioned:
      partialBounds?.left != undefined && partialBounds?.top != undefined,
    sized:
      partialBounds?.width != undefined && partialBounds?.height != undefined,
    bounds: applyMinSize({
      /**
       * Since input bounds may be partial (e.g. only specifying size), we create a full bounds object as a fallback,
       * based on the measured size, positioned in center. We can introduce a "loose" mode, where the returned bound
       * is not "filled" with default properties.
       */
      ...centeredContentBounds,
      ...partialBounds,
    }),
    overlayInteractionHandlerProps,
  };
}

function getBounds(element: HTMLElement) {
  const { left, top, width, height } = element.getBoundingClientRect();
  return { left, top, width, height };
}
