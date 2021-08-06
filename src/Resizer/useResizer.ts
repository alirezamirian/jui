import { useMove } from "../ToolWindow/useMove";
import { ResizerProps } from "./ResizerProps";

type UseResizerProps = Pick<
  ResizerProps,
  "onResize" | "onResizeEnd" | "onResizeStarted"
>;

export type ResizerViewProps = Omit<
  ResizerProps,
  "onResize" | "onResizeEnd" | "onResizeStarted"
> &
  ReturnType<typeof useResizer>;

const useResizer = (
  orientation: "horizontal" | "vertical",
  invert: boolean,
  { onResizeStarted, onResize, onResizeEnd }: UseResizerProps
) => {
  const props = useMove({
    dragThreshold: 0,
    onMoveStart: () => onResizeStarted() || 0,
    onMoveEnd: () => onResizeEnd?.(),
    onMove: ({ movement, startState }) =>
      onResize(
        startState +
          (invert ? -1 : +1) *
            movement[orientation === "horizontal" ? "x" : "y"]
      ),
  });
  return {
    resizerProps: props,
  };
};

export const useLeftResizer = (props: UseResizerProps) => {
  return useResizer("horizontal", false, props);
};

export const useRightResizer = (props: UseResizerProps) => {
  return useResizer("horizontal", true, props);
};

export const useTopResizer = (props: UseResizerProps) => {
  return useResizer("vertical", false, props);
};

export const useBottomResizer = (props: UseResizerProps) => {
  return useResizer("vertical", true, props);
};
