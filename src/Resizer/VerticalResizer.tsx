import React from "react";
import styled from "styled-components";
import { ResizerViewProps } from "./useResizer";

const StyledVerticalResizer = styled.div`
  width: 100%;
  height: 0;
  position: relative;
`;

const StyledVerticalResizerArea = styled.div<{
  handleSize: number;
}>`
  position: absolute;
  cursor: row-resize;
  height: ${({ handleSize }) => `calc(100% + ${handleSize}px)`};
  width: 100%;
  top: ${({ handleSize }) => `-${handleSize / 2}px`};
`;

/**
 * Handle for resizing views in a vertical layout. It just handles the
 * movement event and calls onResize with the new size. It has nothing to do
 * with actually applying the size.
 */
export const VerticalResizer: React.FC<ResizerViewProps> = ({
  outerPadding = 10,
  background,
  size = 0,
  resizerProps,
  children,
}) => (
  <StyledVerticalResizer {...resizerProps} style={{ background, height: size }}>
    {children}
    <StyledVerticalResizerArea handleSize={outerPadding} />
  </StyledVerticalResizer>
);
