import styled from "styled-components";
import { StyledBalloonContainer } from "@intellij-platform/core/Balloon/Balloon.styled";

/**
 * Container component for stacking a number of Balloons in an overlay placed on the bottom right of where it's rendered.
 */
export const StyledBalloonsStack = styled.div`
  position: fixed;
  z-index: 1;
  bottom: 42px;
  right: 26px;
  ${StyledBalloonContainer} {
    margin-bottom: 12px;
  }
`;
