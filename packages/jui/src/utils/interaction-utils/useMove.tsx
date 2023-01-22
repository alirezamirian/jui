import React, { MouseEventHandler } from "react";
import { disableTextSelection, restoreTextSelection } from "./textSelection";
import { useLatest } from "../useLatest";

export type XY = { x: number; y: number };
export type UseMoveOptions<S> = {
  /**
   * the amount of movement (in pixels) after which the move should start. It prevents interference
   * with simple click (or more generally, press) events, and provides better UX.
   * @default 0
   */
  dragThreshold?: number;
  disabled?: boolean;
  onMoveStart: (args: { from: XY }) => S;
  onMove: (args: { from: XY; to: XY; movement: XY; startState: S }) => void;
  onMoveEnd?: (args: { startState: S }) => void;
};

// TODO: cleanup if unmount happens during drag.
// TODO: Better even handling for touch devices?
//  wrapping `useMove` from react-aria to just add support for movement threshold should be the
//  way to go, but there are a few problems:
//    - it seemed a little buggy in the example here: https://react-spectrum.adobe.com/react-aria/useMove.html
//    - the API is not great in a sense that it only gives the diff in last movement.
//      Also onMoveStart doesn't give the initial position, so it's not possible to even calculate
//
// TODO: move should be finished by pressing Escape. onMoveCancel maybe?
/**
 * Similar to https://react-spectrum.adobe.com/react-aria/useMove.html, with slightly different
 * features and API.
 * NOTE: initially the API was designed in a way that onMove and onMove end callbacks were
 * returned from onMoveStart, instead of being directly passed in the options.
 * This would enable capturing the initial state of each move transaction, by defining whatever
 * variable in onMoveStart and closing over them by onMove and onMoveEnd.
 * The problem with this approach was that although you could capture the initial state of the
 * movement, by closure, any other variable in the outer scopes was also closed over, and you were
 * stuck with the values from the particular render in which the movement was started.
 * Of course, you could work around it by using refs, but it would be unintuitive.
 * So because of that issue, it's redesigned to have onMoveStart, onMove, and onMoveEnd all
 * directly passed as options, but you can return anything from `onMoveStart` which will be passed
 * to onMove and onMoveEnd as `startState`.
 */
export function useMove<S>({
  dragThreshold = 0,
  disabled,
  onMoveStart,
  onMove,
  onMoveEnd,
}: UseMoveOptions<S>): { onMouseDown?: MouseEventHandler } {
  const handlersRef = useLatest({ onMove, onMoveEnd });

  const onMouseDown = (event: React.MouseEvent) => {
    disableTextSelection();
    if (event.button !== 0) {
      restoreTextSelection();
      return;
    }
    const from = { x: event.pageX, y: event.pageY };
    let dragStarted = false;
    let startState: S;

    const onMouseMove = (event: MouseEvent) => {
      const { pageX: x, pageY: y } = event;
      const movement = { x: x - from.x, y: y - from.y };
      const isDraggedEnough =
        Math.abs(movement.x) >= dragThreshold ||
        Math.abs(movement.y) >= dragThreshold;
      if (isDraggedEnough && !dragStarted) {
        dragStarted = true;
        startState = onMoveStart({ from });
      }
      if (dragStarted) {
        handlersRef.current.onMove({
          from,
          to: { x: from.x + movement.x, y: from.y + movement.y },
          movement,
          startState,
        });
      }
    };
    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener(
      "mouseup",
      () => {
        restoreTextSelection();
        if (dragStarted) {
          handlersRef.current.onMoveEnd?.({ startState });
        }
        document.removeEventListener("mousemove", onMouseMove);
      },
      { once: true }
    );
  };
  return disabled ? {} : { onMouseDown };
}
