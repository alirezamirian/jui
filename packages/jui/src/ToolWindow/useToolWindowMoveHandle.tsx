import { useWindowInteractionHandler } from "jui/ToolWindow/WindowResizeHandles";
import { useMove } from "./useMove";

export function useToolWindowMoveHandle() {
  const interactionHandler = useWindowInteractionHandler();
  if (!interactionHandler) {
    return {};
  }
  const {
    finishInteraction,
    startInteraction,
    updateBounds,
  } = interactionHandler;

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
  return { moveHandleProps: moveProps };
}
