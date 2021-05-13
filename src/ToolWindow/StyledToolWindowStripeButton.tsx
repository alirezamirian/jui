import { styled } from "../styled";
import React from "react";
import { css } from "styled-components";
import { Anchor } from "./utils";

export interface StyledToolWindowStripeButtonProps {
  anchor: Anchor;
  active?: boolean;
}

const anchorStyles = ({ anchor }: { anchor: Anchor }) => {
  const orientation =
    anchor === "left" || anchor === "right" ? "vertical" : "horizontal";

  return orientation === "horizontal"
    ? css`
        padding: 2.5px 10px;
      `
    : css`
        padding: 10px 2.5px;
        writing-mode: vertical-lr;
        // writing-mode: sideways-lr is not supported anywhere other than FF, so, we need to rotate
        transform: ${anchor === "left" ? "rotateZ(180deg)" : undefined};
      `;
};

export const StyledToolWindowStripeButton = styled.span<StyledToolWindowStripeButtonProps>`
  box-sizing: border-box;
  display: inline-block;
  cursor: default;
  user-select: none;
  overflow: hidden;
  direction: ltr;
  flex-shrink: 0;
  white-space: nowrap;
  color: ${({ theme, active }) =>
    active
      ? theme.color(
          "ToolWindow.Button.selectedForeground",
          theme.dark ? "rgb(255,255,255)" : "rgb(0,0,0)"
        )
      : theme.color("*.foreground")};
  background: ${({ theme, active }) =>
    active
      ? theme.color(
          "ToolWindow.Button.selectedBackground",
          theme.dark ? "rgba(15,15,15,.332)" : "rgba(85,85,85,.332)"
        )
      : undefined};

  ${anchorStyles}
  ${({ active }) =>
    !active &&
    css`
      &:hover {
        background: ${({ theme }) =>
          theme.color(
            "ToolWindow.Button.hoverBackground",
            theme.dark ? "rgba(15,15,15,.156)" : "rgba(85,85,85,.156)"
          )};
      }
    `};
`;
