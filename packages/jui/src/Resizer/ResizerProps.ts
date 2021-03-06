import React, { CSSProperties } from "react";

/**
 * Props are kind of based on ThreeComponentsSplitter in Intellij Platform.
 */
export interface ResizerProps<Orientation = "horizontal" | "vertical"> {
  /**
   * Called when the resize starts by a move action. The callback can optionally
   * return the initial width of the view for which the resize handle
   * is used. The amount of resize will be added to this initial value and
   * passed to `onResize`, when movement happens.
   */
  onResizeStarted: () => number | void;
  /**
   * Called when resize is happening.
   * @param size: New size based on the diff and the initial size returned
   * by onResizeStarted, or zero if initial size is not returned.
   */
  onResize: (size: number) => void;
  /**
   * Called when movement interaction is finished, e.g. by a mouse up event.
   */
  onResizeEnd?: () => void;
  /**
   * Background color of the visible space-occupying part of the resize handle.
   */
  background?: CSSProperties["background"];
  /**
   * Visible and space-occupying part of the resize handle. Total grab-able
   * width will be `size` + `outerPadding`
   * @default 0
   */
  size?: number;
  /**
   * Length of the extra grab-able zone around the resize handle.
   * For example, if set to 10 there will be an area of length 5 pixels in each
   * side of the handle which still can be used for resizing.
   * @default 10
   */
  outerPadding?: number;

  /**
   * Resizer cursor.
   */
  cursor?: Orientation extends "horizontal"
    ? "col" | "ew" | "e" | "w"
    : "row" | "ns" | "n" | "s";

  /**
   * Any arbitrary content for customizing look and feel of the resizer.
   * For example for showing a rounded handle kind of thing in the middle,
   * or showing shadows, etc.
   */
  children?: React.ReactNode;

  /**
   * styles passed to the root resizer element. `width` and `background` is not allowed and will be overridden.
   * NOTE: it's added to allow use case of absolutely positioned resizers in float tool windows. Might be a better
   * idea to add a `absolute` instead option and apply the necessary style based on it, if it can be seen as a re-usable
   * and legit feature.
   */
  style?: Omit<
    CSSProperties,
    (Orientation extends "horizontal" ? "width" : "height") | "background"
  >;
}

export type HorizontalResizerProps = ResizerProps<"horizontal">;
export type VerticalResizerProps = ResizerProps<"vertical">;
