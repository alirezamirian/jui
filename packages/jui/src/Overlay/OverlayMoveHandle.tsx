import { useMove, UseMoveOptions } from "../utils/interaction-utils/useMove";
import { useOverlayInteractionHandler } from "./OverlayInteractionHandler";
import React from "react";

export type UseOverlayMoveHandleOptions = Omit<
  UseMoveOptions<unknown>,
  "onMoveStart" | "onMove" | "onMoveEnd"
>;
/**
 * Used for making a dom element a move handle for the overlay it's being rendered in.
 * It uses the context provided by {@link OverlayInteractionHandler}, and returns props to be applied on a dom element to
 * make it a move handle for the overlay it's being rendered in.
 *
 * @see OverlayMoveHandle
 */
export function useOverlayMoveHandle(options?: UseOverlayMoveHandleOptions) {
  const interactionHandler = useOverlayInteractionHandler();
  if (!interactionHandler) {
    return { moveHandleProps: {} };
  }
  const { finishInteraction, startInteraction, updateBounds } =
    interactionHandler;

  const moveProps = useMove({
    ...options,
    onMoveStart: () => {
      return startInteraction("move");
    },
    onMove: ({ startState, movement }) => {
      updateBounds({
        ...startState,
        top: startState.top + movement.y,
        left: startState.left + movement.x,
      });
    },
    onMoveEnd: () => {
      finishInteraction();
    },
  });
  return { moveHandleProps: moveProps || {} };
}

/**
 * Used for making a dom element a move handle for the overlay it's being rendered in.
 * It uses the context provided by {@link OverlayInteractionHandler}. A render function is expected as `children`. It's
 * passed the event handlers that need to be applied on a dom element to make it a move handle for the overlay it's
 * being rendered in.
 */
export const OverlayMoveHandle = ({
  children,
  ...props
}: {
  children: (
    props: ReturnType<typeof useOverlayMoveHandle>
  ) => React.ReactElement;
} & UseOverlayMoveHandleOptions) => {
  return children(useOverlayMoveHandle(props));
};
