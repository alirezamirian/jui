import React from "react";
import styled from "styled-components";
import { ResizerViewProps } from "./useResizer";

type VerticalResizerViewProps = ResizerViewProps<"vertical">;

const StyledVerticalResizer = styled.div`
  width: 100%;
  height: 0;
  position: relative;
  z-index: 1; // to keep resizer on top of sibling views, in case they are non-static
`;

const StyledVerticalResizerArea = styled.div<{
  handleSize: number;
  cursor: VerticalResizerViewProps["cursor"];
}>`
  position: absolute;
  cursor: ${({ cursor }) => `${cursor}-resize`};
  height: ${({ handleSize }) => `calc(100% + ${handleSize}px)`};
  width: 100%;
  top: ${({ handleSize }) => `-${handleSize / 2}px`};
`;

/**
 * Handle for resizing views in a vertical layout. It just handles the
 * movement event and calls onResize with the new size. It has nothing to do
 * with actually applying the size.
 */
export const VerticalResizer: React.FC<VerticalResizerViewProps> = ({
  outerPadding = 10,
  background,
  size = 0,
  cursor = "row",
  resizerProps,
  children,
  style = {},
}) => (
  <StyledVerticalResizer
    {...resizerProps}
    style={{ ...style, background, height: size }}
  >
    {children}
    <StyledVerticalResizerArea handleSize={outerPadding} cursor={cursor} />
  </StyledVerticalResizer>
);
