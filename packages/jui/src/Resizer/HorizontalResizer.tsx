import React from "react";
import styled from "styled-components";
import { ResizerViewProps } from "./useResizer";

type HorizontalResizerViewProps = ResizerViewProps<"horizontal">;

const StyledHorizontalResizer = styled.div`
  top: 0;
  height: 100%;
  width: 0;
  position: relative;
  z-index: 1; // to keep resizer on top of sibling views, in case they are non-static
`;

const StyledHorizontalResizerArea = styled.div<{
  $handleSize: number;
  $cursor: HorizontalResizerViewProps["cursor"];
}>`
  position: absolute;
  cursor: ${({ $cursor }) => `${$cursor}-resize`};
  width: ${({ $handleSize }) => `calc(100% + ${$handleSize}px)`};
  height: 100%;
  left: ${({ $handleSize }) => `-${$handleSize / 2}px`};
`;

/**
 * Handle for resizing views in a horizontal layout. It just handles the
 * movement event and calls onResize with the new size. It has nothing to do
 * with actually applying the size.
 */
export const HorizontalResizer: React.FC<HorizontalResizerViewProps> = ({
  outerPadding = 10,
  background,
  size = 0,
  cursor = "col",
  children,
  style = {},
  resizerProps,
}) => {
  return (
    <StyledHorizontalResizer
      {...resizerProps}
      style={{ ...style, background, width: size }}
    >
      {children}
      <StyledHorizontalResizerArea
        $handleSize={outerPadding}
        $cursor={cursor}
      />
    </StyledHorizontalResizer>
  );
};
