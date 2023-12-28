import {
  STRIPE_BUTTON_CROSS_PADDING,
  STRIPE_BUTTON_LINE_HEIGHT,
  StyledToolWindowStripeButton,
} from "./StyledToolWindowStripeButton";
import { Anchor, isHorizontalToolWindow, theOtherSide } from "./utils";
import { css } from "styled-components";
import { Theme } from "../Theme/Theme";
import { styled } from "../styled";
import { Color } from "../Theme/Color";

const minHeight = `calc(${STRIPE_BUTTON_LINE_HEIGHT} + ${
  2 * STRIPE_BUTTON_CROSS_PADDING + 1 /*border*/
}px)`;

const anchorStyles = ({
  anchor,
  preventCollapse,
}: StyledToolWindowStripeProps) =>
  isHorizontalToolWindow(anchor)
    ? css`
        flex-direction: row;
        width: 100%;
        min-height: ${preventCollapse ? minHeight : "fit-content"};
        ${StyledToolWindowStripeButton} {
          height: 1.25rem;
        }
      `
    : css`
        flex-direction: column;
        height: 100%;
        min-width: ${preventCollapse ? minHeight : "fit-content"};
        ${StyledToolWindowStripeButton} {
          width: 1.25rem;
        }
      `;
const borderStyle = ({ anchor, theme }: { anchor: Anchor; theme: Theme }) =>
  css`border-${theOtherSide(anchor)}: 1px solid ${
    theme.commonColors.contrastBorder
  }`;

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
