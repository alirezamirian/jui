import React from "react";
import styled from "styled-components";
import { useHorizontalResizer } from "./useResizer";
import { ResizerProps } from "./ResizerProps";

const StyledHorizontalResizer = styled.div`
  height: 100%;
  width: 0;
  position: relative;
`;

const StyledHorizontalResizerArea = styled.div<{
  handleSize: number;
}>`
  position: absolute;
  cursor: col-resize;
  width: ${({ handleSize }) => `calc(100% + ${handleSize}px)`};
  height: 100%;
  left: ${({ handleSize }) => `-${handleSize / 2}px`};
`;

/**
 * Handle for resizing views in a horizontal layout. It just handles the
 * movement event and calls onResize with the new size. It has nothing to do
 * with actually applying the size.
 */
export const HorizontalResizer: React.FC<ResizerProps> = ({
  outerPadding = 10,
  background,
  size = 0,
  children,
  ...otherProps
}) => {
  const { resizerProps } = useHorizontalResizer(otherProps);

  return (
    <StyledHorizontalResizer
      {...resizerProps}
      style={{ background, width: size }}
    >
      {children}
      <StyledHorizontalResizerArea handleSize={outerPadding} />
    </StyledHorizontalResizer>
  );
};
