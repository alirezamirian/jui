import React, { RefObject, useLayoutEffect, useState } from "react";

/**
 * Similar to {@link import('@react-aria/overlays').useOverlayPosition useOverlayPosition},
 * but for positioning an overlay relative to a point, typically coordinates of a mouse event.
 * It's less advanced than useOverlayPosition, not taking into account many edge cases that
 * `useOverlayPosition` does.
 * Most importantly:
 * - Window resize is not taken into account
 * - Overlay resize is not taken into account.
 *   Positioning only happens when the origin changes.
 * - There are no options for positioning options like placement, offset or crossOffset
 *
 * @see https://github.com/adobe/react-spectrum/discussions/7267
 */
export function useOverlayPositionFromOrigin({
  overlayRef,
  origin,
  containerPadding,
}: {
  overlayRef: RefObject<HTMLElement>;
  containerPadding?: number | { x: number; y: number };
  origin: Pick<React.MouseEvent, "clientX" | "clientY"> | undefined;
}) {
  const [position, setPosition] = useState<{ left?: number; top?: number }>({});

  useLayoutEffect(() => {
    const overlayElement = overlayRef.current;
    setPosition(
      origin && overlayElement
        ? calculatePosition({
            clientX:
              origin.clientX +
              1.5 /* a tiny offset is added to avoid menu items getting hovered upon open. 1px doesn't consistently work. */,
            clientY: origin.clientY,
            containerPadding,
            overlayWidth: overlayElement.offsetWidth,
            overlayHeight: overlayElement.offsetHeight,
          })
        : {}
    );
  }, [origin?.clientX, origin?.clientY]);
  return {
    positionProps: {
      style: { position: "fixed", zIndex: 100000, ...position } as const,
    },
  };
}

function calculatePosition({
  clientX,
  clientY,
  overlayWidth,
  overlayHeight,
  containerPadding = 0,
}: {
  clientX: number;
  clientY: number;
  overlayWidth: number;
  overlayHeight: number;
  containerPadding?: number | { x: number; y: number };
}) {
  const totalWidth =
    document.documentElement.clientWidth -
    (typeof containerPadding === "object"
      ? containerPadding.x
      : containerPadding);
  const totalHeight =
    document.documentElement.clientHeight -
    (typeof containerPadding === "object"
      ? containerPadding.y
      : containerPadding);

  let top = clientY;
  let left = clientX;

  if (left + overlayWidth > totalWidth) {
    left = totalWidth - overlayWidth;
  }

  if (top + overlayHeight > totalHeight) {
    top = totalHeight - overlayHeight;
  }

  top = Math.max(0, top);
  left = Math.max(0, left);

  return { top, left };
}
