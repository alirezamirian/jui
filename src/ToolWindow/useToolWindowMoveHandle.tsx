import { useWindowInteractionHandler } from "./FloatView";
import { useMove } from "./useMove";

export function useToolWindowMoveHandle() {
  const {
    finishInteraction,
    startInteraction,
    updateBounds,
  } = useWindowInteractionHandler();

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
