import React from "react";
import { HorizontalResizer } from "./HorizontalResizer";
import { ResizerProps } from "./ResizerProps";
import { useLeftResizer } from "./useResizer";

/**
 * Handle for resizing views in a horizontal layout, where the resizing view is the left one.
 */
export const LeftResizer: React.FC<ResizerProps> = ({
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
