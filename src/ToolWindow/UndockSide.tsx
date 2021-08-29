import React, { RefObject } from "react";
import { css } from "styled-components";
import { ResizableView } from "../ResizableView";
import { styled } from "../styled";
import { SideUnDockedState } from "./ToolWindowsState/ToolWindowsLayoutState";
import { ToolWindowsState } from "./ToolWindowsState/ToolWindowsState";
import { Anchor, isHorizontal } from "./utils";

export const StyledUndockSide = styled.div<{ anchor: Anchor }>`
  position: absolute;
  background: inherit;
  z-index: 1;
  ${({ anchor }) =>
    isHorizontal(anchor)
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
  containerRef,
  toolWindowsState,
  onToolWindowStateChange,
}: {
  state: Exclude<SideUnDockedState, null>;
  anchor: Anchor;
  children: React.ReactNode;
  containerRef: RefObject<HTMLElement>;
  toolWindowsState: Readonly<ToolWindowsState>;
  onToolWindowStateChange: (newState: ToolWindowsState) => void;
}) {
  return (
    state && (
      <StyledUndockSide anchor={anchor}>
        <ResizableView
          orientation={isHorizontal(anchor) ? "vertical" : "horizontal"}
          resizerPlacement={
            anchor === "left" || anchor === "top" ? "after" : "before"
          }
          size={state.size}
          onResize={(size) => {
            containerRef.current &&
              onToolWindowStateChange(
                toolWindowsState.resizeUndock(
                  anchor,
                  size,
                  containerRef.current.getBoundingClientRect()
                )
              );
          }}
        >
          {children}
        </ResizableView>
      </StyledUndockSide>
    )
  );
}
