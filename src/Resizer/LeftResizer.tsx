import React from "react";
import { HorizontalResizer } from "./HorizontalResizer";
import { ResizerProps } from "./ResizerProps";
import { useLeftResizer } from "./useResizer";

/**
 * Handle for resizing views in a horizontal layout, where the resizer is at the left side of the resizable view. i.e.
 * moving mouse to right/left will decrease/increase the width
 */
export const LeftResizer: React.FC<ResizerProps<"horizontal">> = ({
  onResize,
  onResizeEnd,
  onResizeStarted,
  ...props
}) => {
  const { resizerProps } = useLeftResizer({
    onResize,
    onResizeEnd,
    onResizeStarted,
  });
  return <HorizontalResizer resizerProps={resizerProps} {...props} />;
};
