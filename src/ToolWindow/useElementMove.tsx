import { useMove, UseMoveOptions, XY } from "./useMove";
import { RefObject } from "react";
import { findEffectiveBackgroundColor } from "./findEffectiveBackgroundColor";

export interface UseElementMoveOptions<S>
  extends Omit<UseMoveOptions<S>, "onMoveStart" | "onMove"> {
  ref: RefObject<HTMLElement>;
  /**
   * if true a clone of the element is created and used as ghost.
   * A function can be passed to customize the default ghost element or return a completely
   * different one.
   */
  ghost?: boolean | ((defaultGhost: HTMLElement) => HTMLElement);

  onMoveStart: (args: { from: ClientRect }) => S;
  onMove: (args: {
    from: ClientRect;
    to: ClientRect;
    movement: XY;
    startState: S;
  }) => void;
}

/**
 * Provides necessary event handling props to be applied on an element to make it movable.
 * It's implemented on top of {@link useMove}. The differences are:
 * - The signature of `onMoveStart`, `onMove` and `onMoveEnd` are changed to pass
 *   {@link ClientRect} instead of {@link XY}.
 * - rendering a ghost element.
 *
 * ## A note about ghost:
 * There is no easy way to create a snapshot image of an html element. Native drag and drop API
 * supports [setting drag
 * image](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setDragImage) but we are
 * not using drag events mainly because of not being able to customize the offset after which drag
 * should start. See {@link UseMoveOptions#dragThreshold dragThreshold} for more details. There are
 * some libraries like html2canvas for creating an image from an html element, but they are very
 * big and using them doesn't make sense at all from a value/cost ratio perspective. There might be
 * some ways of implementing custom move threshold on top of native drag events. For example by
 * delaying the call to setDragImage, but it needs more investigation. Also, not sure if opacity of
 * the ghost is something you can control when using setDragImage.
 **/
export function useElementMove<S>({
  ref,
  onMoveStart,
  onMove,
  onMoveEnd,
  ghost: ghostOption,
  ...otherOptions
}: UseElementMoveOptions<S>) {
  return useMove({
    ...otherOptions,
    onMoveStart: () => {
      const element = ref.current;
      let ghost: HTMLElement | null = null;
      if (!element) {
        throw new Error(
          "Movement started but ref value is null. Make sure the passed ref is applied on the same element that other props are."
        );
      }
      const updateGhostPosition = (rect: ClientRect) => {
        if (ghost) {
          ghost.style.left = `${rect.left}px`;
          ghost.style.top = `${rect.top}px`;
        }
      };
      const from: ClientRect = element.getBoundingClientRect();
      if (ghostOption) {
        const defaultGhost = createDefaultGhost(element);
        ghost =
          typeof ghostOption === "function"
            ? ghostOption(defaultGhost) || defaultGhost
            : defaultGhost;
        ghost.style.position = "absolute";
        document.body.append(ghost);
        updateGhostPosition(from);
      }
      return {
        ghost,
        from,
        updateGhostPosition,
        startState: onMoveStart({ from }),
      };
    },
    onMove: ({
      movement,
      startState: { from, updateGhostPosition, startState },
    }) => {
      const to: ClientRect = {
        left: from.left + movement.x,
        right: from.right + movement.x,
        top: from.top + movement.y,
        bottom: from.bottom + movement.y,
        height: from.height,
        width: from.width,
      };
      updateGhostPosition(to);
      onMove({ from, to, movement, startState });
    },
    onMoveEnd: ({ startState: { ghost, startState } }) => {
      ghost?.remove();
      onMoveEnd({ startState });
    },
  });
}

function createDefaultGhost(element: HTMLElement) {
  const ghost = element.cloneNode(true) as HTMLElement;
  ghost.style.backgroundColor = findEffectiveBackgroundColor(element);
  return ghost;
}
