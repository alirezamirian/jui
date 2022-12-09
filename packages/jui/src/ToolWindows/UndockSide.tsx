import React from "react";
import { css } from "styled-components";
import { ResizableView } from "../ResizableView";
import { styled } from "../styled";
import { SideUnDockedState } from "./ToolWindowsState/ToolWindowsLayoutState";
import { Anchor, isHorizontalToolWindow } from "./utils";

export const StyledUndockSide = styled.div<{ anchor: Anchor }>`
  position: absolute;
  background: inherit;
  z-index: 1;
  ${({ anchor }) =>
    isHorizontalToolWindow(anchor)
      ? css`
          left: 0;
          right: 0;
        `
      : css`
          top: 0;
          bottom: 0;
        `};
  ${({ anchor }) =>
    css`
      ${anchor}: 0;
    `};
`;

export function UndockSide({
  state,
  anchor,
  children,
  onResize,
}: {
  state: Exclude<SideUnDockedState, null>;
  anchor: Anchor;
  children: React.ReactNode;
  onResize: (size: number) => void;
}) {
  return (
    state && (
      <StyledUndockSide anchor={anchor}>
        <ResizableView
          orientation={
            isHorizontalToolWindow(anchor) ? "vertical" : "horizontal"
          }
          resizerPlacement={
            anchor === "left" || anchor === "top" ? "after" : "before"
          }
          size={state.size}
          onResize={onResize}
        >
          {children}
        </ResizableView>
      </StyledUndockSide>
    )
  );
}
