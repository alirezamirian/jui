import { compose, identity } from "ramda";
import React, {
  CSSProperties,
  RefObject,
  useLayoutEffect,
  useState,
} from "react";
import { css, styled } from "@intellij-platform/core/styled";

import {
  tooltipBackground,
  WITH_POINTER_BORDER_RADIUS,
} from "./tooltip-styles";

type OffsetValue = number | `${number}%`;
export type TooltipPointerPosition = {
  /**
   * The side of the tooltip the pointer is shown
   */
  side: "top" | "bottom" | "left" | "right";
  /**
   * - When side is "top" or "bottom":
   *   Horizontal offset (in px) with respect to the left (or right, if negative) of the tooltip.
   * - When side is "left" or "right":
   *   Vertical offset (in px) with respect to the top (or bottom, if negative) of the tooltip.
   *
   * @default: '50%'
   */
  offset?: OffsetValue | { value: OffsetValue; invert?: boolean };
};

const POINTER_WIDTH = 6;
const POINTER_HEIGHT = 9;
const POINTER_THICKNESS = 1.5;
const TRANSLATE = `translate(-${POINTER_WIDTH}px, -${POINTER_HEIGHT}px)`;
const sideStyles = {
  top: css`
    top: 0;
    transform: ${TRANSLATE};
  `,
  bottom: css`
    bottom: 0;
    transform: rotateX(180deg) ${TRANSLATE};
  `,
  left: css`
    left: 0;
    transform: rotate(-90deg) ${TRANSLATE};
  `,
  right: css`
    right: 0;
    transform: rotate(90deg) ${TRANSLATE};
  `,
};
const StyledTooltipPointer = styled.span<{
  side: TooltipPointerPosition["side"];
}>`
  position: absolute;
  width: 0;
  height: 0;
  ${({ side }) => sideStyles[side]};

  &::before {
    content: "";
    position: absolute;
    border-left: ${POINTER_WIDTH + POINTER_THICKNESS}px solid transparent;
    border-right: ${POINTER_WIDTH + POINTER_THICKNESS}px solid transparent;
    border-bottom: ${POINTER_HEIGHT + POINTER_THICKNESS}px solid #636569;
    left: -${POINTER_THICKNESS}px;
    top: -${POINTER_THICKNESS}px;
  }

  &::after {
    content: "";
    position: absolute;
    border-left: ${POINTER_WIDTH}px solid transparent;
    border-right: ${POINTER_WIDTH}px solid transparent;
    border-bottom: ${POINTER_HEIGHT}px solid ${tooltipBackground};
  }
`;

function normalizeCssValue(value: string | number) {
  return typeof value === "number" ? `${value}px` : value;
}

const withMin = (min: number) => (value: string | number | undefined) =>
  value != undefined ? `max(${min}px, ${normalizeCssValue(value)})` : value;
const withMax = (max: number) => (value: string | number | undefined) =>
  value != undefined ? `min(${max}px, ${normalizeCssValue(value)})` : value;
const HEIGHT_OFFSET = POINTER_HEIGHT + WITH_POINTER_BORDER_RADIUS;
const WIDTH_OFFSET = POINTER_WIDTH + WITH_POINTER_BORDER_RADIUS;

/**
 * Ensures pointer is not offset too much or too little that would make the arrow appear
 * outside the tooltip boundary.
 */
function limitPointerPositionStyles(
  { width, height }: { width: number | undefined; height: number | undefined },
  { top, left, right, bottom }: CSSProperties
) {
  const applyVerticalMinMax = compose(
    height ? withMax(height - HEIGHT_OFFSET) : identity,
    withMin(HEIGHT_OFFSET)
  );
  const applyHorizontalMinMax = compose(
    width ? withMax(width - WIDTH_OFFSET) : identity,
    withMin(WIDTH_OFFSET)
  );
  console.log({
    top: applyVerticalMinMax(top),
    bottom: applyVerticalMinMax(bottom),
    left: applyHorizontalMinMax(left),
    right: applyHorizontalMinMax(right),
  });
  return {
    top: applyVerticalMinMax(top),
    bottom: applyVerticalMinMax(bottom),
    left: applyHorizontalMinMax(left),
    right: applyHorizontalMinMax(right),
  };
}

const getOffsetCssProp = (
  side: TooltipPointerPosition["side"],
  invert?: boolean
): "top" | "bottom" | "left" | "right" => {
  if (side === "top" || side === "bottom") {
    return invert ? "right" : "left";
  }
  return invert ? "bottom" : "top";
};

function pointerPositionToOffsetStyle({
  side,
  offset = "50%",
}: TooltipPointerPosition): CSSProperties {
  const { invert = false, value: offsetValue } =
    typeof offset === "object" ? offset : { invert: false, value: offset };
  return {
    [getOffsetCssProp(side, invert)]: offsetValue,
  };
}

export function TooltipPointer({
  side,
  offset,
  tooltipRef,
}: {
  side: TooltipPointerPosition["side"];
  offset:
    | { type: "calculated"; value: CSSProperties }
    | { type: "specific"; value: TooltipPointerPosition["offset"] };
  tooltipRef: RefObject<HTMLElement>;
}) {
  const [size, setSize] = useState<{
    height: number | undefined;
    width: number | undefined;
  }>({ height: undefined, width: undefined });
  useLayoutEffect(() => {
    const { offsetHeight, offsetWidth } = tooltipRef.current || {};
    if (offsetHeight != size?.height || offsetWidth != size?.width) {
      setSize({ height: offsetHeight, width: offsetWidth });
    }
  });

  return (
    <StyledTooltipPointer
      side={side}
      style={limitPointerPositionStyles(
        size,
        offset.type === "specific"
          ? pointerPositionToOffsetStyle({ side, offset: offset.value })
          : offset.value
      )}
    />
  );
}
