import { Anchor, isHorizontal, theOtherSide } from "./utils";
import { css } from "styled-components";
import { Theme } from "../Theme/Theme";
import { styled } from "../styled";
import { Color } from "../Theme/Color";

const anchorStyles = ({
  anchor,
  preventCollapse,
}: StyledToolWindowStripeProps) =>
  isHorizontal(anchor)
    ? css`
        flex-direction: row;
        width: 100%;
        min-height: ${preventCollapse ? "calc(1.155em + 6px)" : undefined};
      `
    : css`
        flex-direction: column;
        height: 100%;
        min-width: ${preventCollapse ? "calc(1.155em + 6px)" : undefined};
      `;
const borderStyle = ({ anchor, theme }: { anchor: Anchor; theme: Theme }) =>
  css`border-${theOtherSide(anchor)}: 1px solid ${theme.color(
    "Borders.ContrastBorderColor",
    theme.dark ? "#323232" : "#c9c9c9"
  )}`;

export interface StyledToolWindowStripeProps {
  anchor: Anchor;
  highlighted?: boolean;
  preventCollapse?: boolean;
}

export const StyledToolWindowStripe = styled.div<StyledToolWindowStripeProps>`
  box-sizing: border-box;
  background: ${({ theme, highlighted }) =>
    highlighted
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
