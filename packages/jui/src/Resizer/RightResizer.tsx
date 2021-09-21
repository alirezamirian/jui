import React from "react";
import { HorizontalResizer } from "./HorizontalResizer";
import { ResizerProps } from "./ResizerProps";
import { useRightResizer } from "./useResizer";

/**
 * Handle for resizing views in a horizontal layout, where the resizer is at the right side of the resizable view. i.e.
 * moving mouse to right/left will increase/decrease the width
 */
export const RightResizer: React.FC<ResizerProps<"horizontal">> = ({
  onResize,
  onResizeEnd,
  onResizeStarted,
  ...props
}) => {
  const { resizerProps } = useRightResizer({
    onResize,
    onResizeEnd,
    onResizeStarted,
  });
  return <HorizontalResizer resizerProps={resizerProps} {...props} />;
};
