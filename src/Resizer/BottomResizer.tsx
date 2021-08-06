import React from "react";
import { ResizerProps } from "./ResizerProps";
import { useBottomResizer } from "./useResizer";
import { VerticalResizer } from "./VerticalResizer";

/**
 * Handle for resizing views in a vertical layout, where the resizing view is the bottom one.
 */
export const BottomResizer: React.FC<ResizerProps> = ({
  onResize,
  onResizeEnd,
  onResizeStarted,
  ...props
}) => {
  const { resizerProps } = useBottomResizer({
    onResize,
    onResizeEnd,
    onResizeStarted,
  });
  return <VerticalResizer resizerProps={resizerProps} {...props} />;
};
