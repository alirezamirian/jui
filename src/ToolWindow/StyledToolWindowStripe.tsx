import { Anchor, isHorizontal, theOtherSide } from "./utils";
import { css } from "styled-components";
import { Theme } from "../Theme/Theme";
import { styled } from "../styled";
import { Color } from "../Theme/Color";

const anchorStyles = ({ anchor }: { anchor: Anchor }) =>
  isHorizontal(anchor)
    ? css`
        flex-direction: row;
        width: 100%;
        padding: 0 20px;
      `
    : css`
        flex-direction: column;
        height: 100%;
        padding: 20px 0;
      `;
const borderStyle = ({ anchor, theme }: { anchor: Anchor; theme: Theme }) =>
  css`border-${theOtherSide(anchor)}: 1px solid ${theme.color(
    "Borders.ContrastBorderColor",
    theme.dark ? "#323232" : "#c9c9c9"
  )}`;

export interface StyledToolWindowStripeProps {
  anchor: Anchor;
  acceptsDrop?: boolean;
}

export const StyledToolWindowStripe = styled.div<StyledToolWindowStripeProps>`
  box-sizing: border-box;
  background: ${({ theme, acceptsDrop }) =>
    acceptsDrop
      ? Color.brighter(theme.commonColors.panelBackground)
      : theme.commonColors.panelBackground};
  display: inline-flex;
  overflow: hidden;
  ${borderStyle};
  ${anchorStyles}
`;

export const StyledSpacer = styled.div`
  flex: 1;
`;