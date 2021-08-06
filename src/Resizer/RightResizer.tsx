import React from "react";
import { HorizontalResizer } from "./HorizontalResizer";
import { ResizerProps } from "./ResizerProps";
import { useRightResizer } from "./useResizer";

/**
 * Handle for resizing views in a horizontal layout, where the resizing view is the right one.
 */
export const RightResizer: React.FC<ResizerProps> = ({
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
