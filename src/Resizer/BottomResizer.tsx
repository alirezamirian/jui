import React from "react";
import { ResizerProps } from "./ResizerProps";
import { useBottomResizer } from "./useResizer";
import { VerticalResizer } from "./VerticalResizer";

/**
 * Handle for resizing views in a vertical layout, where the resizer is at the top side of the resizable view. i.e.
 * moving mouse to bottom/top will increase/decrease the height
 */
export const BottomResizer: React.FC<ResizerProps<"vertical">> = ({
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
