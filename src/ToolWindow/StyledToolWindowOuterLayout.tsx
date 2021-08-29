import { styled } from "../styled";
import { css } from "styled-components";

const TopStripe = styled.div`
  display: flex; // default display, which is block causes an unwanted minimum height
  grid-area: ts;
`;
const BottomStripe = styled.div`
  display: flex; // default display, which is block causes an unwanted minimum height
  grid-area: bs;
`;
const LeftStripe = styled.div`
  grid-area: ls;
`;
const RightStripe = styled.div`
  grid-area: rs;
`;
const MainView = styled.div`
  grid-area: main;
  min-height: 0; // necessary to prevent overflow;
  position: relative; // necessary for undock views which are absolute positioned
  background: inherit;
`;

/**
 * The container which renders top,bottom,left and right stripes with a centered content.
 * responsible only for the layout of the stripes and the centered content. layout doesn't
 * include the opened tool windows on different sides and is just about the stripes around
 * the center area.
 * It also supports toggling stripes visibility.
 */
const Shell = styled.div<{ hideStripes: boolean }>`
  display: grid;
  grid-template-columns: min-content auto min-content;
  grid-template-rows: min-content auto min-content;
  grid-template-areas:
    ".   ts   ."
    "ls main rs"
    ".   bs   .";

  background: ${({ theme }) => theme.commonColors.panelBackground};
  color: ${({ theme }) => theme.color("*.foreground")};
  ${({ hideStripes }) =>
    hideStripes &&
    css`
      ${TopStripe},
      ${BottomStripe}, 
      ${LeftStripe}, 
      ${RightStripe} {
        display: none;
      }
    `}
`;

export const StyledToolWindowOuterLayout = {
  Shell,
  TopStripe,
  BottomStripe,
  LeftStripe,
  RightStripe,
  MainView,
};
