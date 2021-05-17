import React from "react";

export type XY = { x: number; y: number };
export type UseMoveOptions = {
  /**
   * the amount of movement (in pixels) after which the move should start. It prevents interference
   * with simple click (or more generally, press) events, and provides better UX.
   * @default 0
   */
  dragThreshold?: number;
  onMoveStart: (args: {
    from: XY;
  }) => {
    onMove: (args: { from: XY; to: XY; movement: XY }) => void;
    onMoveEnd: () => void;
  };
};

// TODO: cleanup if unmount happens during drag.
// TODO: Better even handling for touch devices?
//  wrapping `useMove` from react-aria to just add support for movement threshold should be the
//  way to go, but there are a few problems:
//    - it seemed a little buggy in the example here: https://react-spectrum.adobe.com/react-aria/useMove.html
//    - the API is not great in a sense that it only gives the diff in last movement.
//      Also onMoveStart doesn't give the initial position, so it's not possible to even calculate
//
// TODO: disable text selection when move starts and restore it when finished.
/**
 * Similar to https://react-spectrum.adobe.com/react-aria/useMove.html, with slightly different
 * features and API.
 * NOTE: the API is intentionally designed in a way that onMove and onMove end callbacks are
 * returned from onMoveStart callback, instead of being directly passed in the options.
 * This enables capturing the initial state of each move transaction, by defining whatever variable
 * in onMoveStart and closing over them by onMove and onMoveEnd.
 */
export function useMove({ dragThreshold = 0, onMoveStart }: UseMoveOptions) {
  const onMouseDown = (event: React.MouseEvent) => {
    const from = { x: event.pageX, y: event.pageY };
    let dragStarted = false;
    let handlers: ReturnType<typeof onMoveStart> = {
      onMove: () => {},
      onMoveEnd: () => {},
    };

    const onMouseMove = (event: MouseEvent) => {
      const { pageX: x, pageY: y } = event;
      const movement = { x: x - from.x, y: y - from.y };
      const isDraggedEnough =
        Math.abs(movement.x) >= dragThreshold ||
        Math.abs(movement.y) >= dragThreshold;
      if (isDraggedEnough && !dragStarted) {
        dragStarted = true;
        handlers = onMoveStart({ from });
      }
      if (dragStarted) {
        handlers.onMove({
          from,
          to: { x: from.x + movement.x, y: from.y + movement.y },
          movement,
        });
      }
    };
    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener(
      "mouseup",
      () => {
        handlers.onMoveEnd();
        document.removeEventListener("mousemove", onMouseMove);
      },
      { once: true }
    );
  };
  return { onMouseDown };
}
