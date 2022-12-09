import { useMove } from "../utils/interaction-utils/useMove";
import { useWindowInteractionHandler } from "./WindowInteractionHandler";
import React from "react";

/**
 * Used for making a dom element a move handle for the window it's being rendered in.
 * It uses the context provided by {@link WindowInteractionHandler}, and returns props to be applied on a dom element to
 * make it a move handle for the window it's being rendered in.
 *
 * @see WindowMoveHandle
 */
export function useWindowMoveHandle() {
  const interactionHandler = useWindowInteractionHandler();
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
 * Used for making a dom element a move handle for the window it's being rendered in.
 * It uses the context provided by {@link WindowInteractionHandler}. A render function is expected as `children`. It's
 * passed the event handlers that need to be applied on a dom element to make it a move handle for the window it's being
 * rendered in.
 */
export const WindowMoveHandle = ({
  children,
}: {
  children: (
    props: ReturnType<typeof useWindowMoveHandle>
  ) => React.ReactElement;
}) => {
  return children(useWindowMoveHandle());
};
