import { useMove } from "../ToolWindow/useMove";
import { ResizerProps } from "./ResizerProps";

type UseResizerProps = Pick<
  ResizerProps,
  "onResize" | "onResizeEnd" | "onResizeStarted"
>;

const useResizer = (
  orientation: "horizontal" | "vertical",
  { onResizeStarted, onResize, onResizeEnd }: UseResizerProps
) => {
  const props = useMove({
    dragThreshold: 0,
    onMoveStart: () => onResizeStarted() || 0,
    onMoveEnd: () => onResizeEnd?.(),
    onMove: ({ movement, startState }) =>
      onResize(startState + movement[orientation === "horizontal" ? "x" : "y"]),
  });
  return {
    resizerProps: props,
  };
};

// if useResizer was curried: const useHorizontalResizer = useResizer('horizontal');
export const useHorizontalResizer = (props: UseResizerProps) => {
  return useResizer("horizontal", props);
};

// if useResizer was curried: const useVerticalResizer = useResizer('vertical');
export const useVerticalResizer = (props: UseResizerProps) => {
  return useResizer("vertical", props);
};
