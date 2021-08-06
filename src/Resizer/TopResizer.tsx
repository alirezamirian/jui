import React from "react";
import { ResizerProps } from "./ResizerProps";
import { useTopResizer } from "./useResizer";
import { VerticalResizer } from "./VerticalResizer";

/**
 * Handle for resizing views in a vertical layout, where the resizing view is the top one.
 */
export const TopResizer: React.FC<ResizerProps> = ({
  onResize,
  onResizeEnd,
  onResizeStarted,
  ...props
}) => {
  const { resizerProps } = useTopResizer({
    onResize,
    onResizeEnd,
    onResizeStarted,
  });
  return <VerticalResizer resizerProps={resizerProps} {...props} />;
};
