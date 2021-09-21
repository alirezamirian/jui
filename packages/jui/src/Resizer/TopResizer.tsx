import React from "react";
import { ResizerProps } from "./ResizerProps";
import { useTopResizer } from "./useResizer";
import { VerticalResizer } from "./VerticalResizer";

/**
 * Handle for resizing views in a vertical layout, where the resizer is at the top side of the resizable view. i.e.
 * moving mouse to bottom/top will decrease/increase the height
 */
export const TopResizer: React.FC<ResizerProps<"vertical">> = ({
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
