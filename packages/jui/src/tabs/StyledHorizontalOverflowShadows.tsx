import { css, styled } from "jui";

interface Props {
  hasOverflowAtStart: boolean;
  hasOverflowAtEnd: boolean;
}

const horizontalOverflowIndicatorStyles = css`
  content: "";
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 10px;
  z-index: 1;
`;
export const StyledHorizontalOverflowShadows = styled.div<Props>`
  position: relative; // for overflow indicator (pseudo-)elements to be positioned absolute

  /* FIXME: find out what color, width and gradient parameters are used in the original implementation */
  ${({ hasOverflowAtStart }) =>
    hasOverflowAtStart &&
    css`
      ::before {
        ${horizontalOverflowIndicatorStyles};
        background: linear-gradient(
          90deg,
          ${({ theme }) => theme.commonColors.panelBackground} 0%,
          transparent 100%
        );
        left: 0;
      }
    `};
  ${({ hasOverflowAtEnd }) =>
    hasOverflowAtEnd &&
    css`
      ::after {
        ${horizontalOverflowIndicatorStyles};
        background: linear-gradient(
          -90deg,
          ${({ theme }) => theme.commonColors.panelBackground} 0%,
          transparent 100%
        );
        right: 0;
      }
    `};
`;
