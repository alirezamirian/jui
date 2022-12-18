import { useMove } from "../utils/interaction-utils/useMove";
import { useOverlayInteractionHandler } from "./OverlayInteractionHandler";
import React from "react";

/**
 * Used for making a dom element a move handle for the overlay it's being rendered in.
 * It uses the context provided by {@link OverlayInteractionHandler}, and returns props to be applied on a dom element to
 * make it a move handle for the overlay it's being rendered in.
 *
 * @see OverlayMoveHandle
 */
export function useOverlayMoveHandle() {
  const interactionHandler = useOverlayInteractionHandler();
  if (!interactionHandler) {
    return { moveHandleProps: {} };
  }
  const { finishInteraction, startInteraction, updateBounds } =
    interactionHandler;

  const moveProps = useMove({
    onMoveStart: () => {
      return startInteraction();
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
}: {
  children: (
    props: ReturnType<typeof useOverlayMoveHandle>
  ) => React.ReactElement;
}) => {
  return children(useOverlayMoveHandle());
};
