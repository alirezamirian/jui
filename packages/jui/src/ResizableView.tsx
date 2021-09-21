import React from "react";
import {
  ThreeViewSplitter,
  ThreeViewSplitterProps,
} from "./ThreeViewSplitter/ThreeViewSplitter";

type ResizableViewProps = Omit<
  ThreeViewSplitterProps,
  | "innerView"
  | "firstView"
  | "firstSize"
  | "onFirstResize"
  | "lastView"
  | "lastSize"
  | "onLastResize"
> & {
  children: React.ReactNode;
  onResize: ThreeViewSplitterProps["onFirstResize"];
  size: ThreeViewSplitterProps["firstSize"];
  /**
   * Whether the resizer should be placed at before or after the resizable view.
   */
  resizerPlacement?: "before" | "after";
};
/**
 * A single resizable view, built on top of {@link ThreeViewSplitter}, just to provide better prop interface.
 * Like `ThreeViewSplitter` it supports "horizontal" or "vertical orientations. There is an extra `resizerPlacement`
 * prop which determines where the resizer should be placed in relation with the view. When set to "before" the view
 * will be resizable from the start ("left" or "top"). When set to "after" the view will be resizable from end ("right"
 * or "bottom"). Default is "after"
 */
export const ResizableView = ({
  children,
  size,
  onResize,
  resizerPlacement = "after",
  ...props
}: ResizableViewProps) => (
  <ThreeViewSplitter
    {...(resizerPlacement === "after"
      ? { firstView: children, firstSize: size, onFirstResize: onResize }
      : { lastView: children, lastSize: size, onLastResize: onResize })}
    {...props}
  />
);
