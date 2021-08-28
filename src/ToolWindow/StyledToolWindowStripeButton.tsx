import { StyledIconWrapper } from "../Icon/StyledIconWrapper";
import { styled } from "../styled";
import React from "react";
import { css } from "styled-components";
import { Anchor } from "./utils";

export interface StyledToolWindowStripeButtonProps {
  anchor: Anchor;
  active?: boolean;
}

export const STRIPE_BUTTON_CROSS_PADDING = 2.5;
export const STRIPE_BUTTON_LINE_HEIGHT = "1rem";

const anchorStyles = ({ anchor }: { anchor: Anchor }) => {
  const orientation =
    anchor === "left" || anchor === "right" ? "vertical" : "horizontal";

  return orientation === "horizontal"
    ? css`
        padding: ${STRIPE_BUTTON_CROSS_PADDING}px 10px;
      `
    : css`
        padding: 10px ${STRIPE_BUTTON_CROSS_PADDING}px;
        writing-mode: vertical-lr;
        // writing-mode: sideways-lr is not supported anywhere other than FF, so, we need to rotate
        transform: ${anchor === "left" ? "rotateZ(180deg)" : undefined};

        // icons are not rotated like text in Intellij Platform implementation. It kind of makes sense.
        ${StyledIconWrapper} {
          transform: rotate(180deg);
        }
      `;
};

export const StyledToolWindowStripeButton = styled.span<StyledToolWindowStripeButtonProps>`
  box-sizing: border-box;
  display: flex; // to allow icon and text alignment by default;
  align-items: center;
  cursor: default;
  user-select: none;
  overflow: hidden;
  direction: ltr;
  flex-shrink: 0;
  font-size: 0.7rem;
  line-height: ${STRIPE_BUTTON_LINE_HEIGHT}; // absolute value seems to be problematic when the base font size is changed
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
