import React from "react";
import { styled } from "@intellij-platform/core/styled";
import { UnknownThemeProp } from "@intellij-platform/core/Theme";

export interface StatusBarProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

/**
 * Status bar rendered at the bottom of the main window. In the reference implementation, there are three slots for
 * content: left, right and center. It doesn't seem center is really necessary, so only left and right are supported
 * for now.
 * @param left content on the left side of the status bar.
 * @param right content on the right side of the status bar. Typically, a bunch of {@link StatusBarWidget}s
 */
export const StatusBar = ({
  left,
  right,
}: StatusBarProps): React.ReactElement => {
  return (
    <StyledStatusBar>
      <StyledStatusBarLeft>{left}</StyledStatusBarLeft>
      <StyledStatusBarRight>{right}</StyledStatusBarRight>
    </StyledStatusBar>
  );
};

const StyledStatusBar = styled.div`
  box-sizing: border-box;
  padding: 0 0.25rem;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between; // because there is left and right sides
  background-color: ${({ theme }) =>
    theme.color(
      "StatusBar.background" as UnknownThemeProp,
      theme.color("Panel.background")
    ) || "#fff"};
  color: ${({ theme }) =>
    theme.color(
      "StatusBar.Widget.foreground" as UnknownThemeProp,
      theme.commonColors.labelForeground
    )};
  border-top: 1px solid
    ${({ theme }) => theme.color("StatusBar.borderColor", "rgb(145, 145, 145)")};
  height: calc(1.25rem + 1px /* border*/);
  line-height: 1.25rem;
  font-size: 0.656rem; // not verified
  cursor: default;
`;

const StyledStatusBarSection = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const StyledStatusBarRight = styled(StyledStatusBarSection)`
  flex-shrink: 0;
`;
const StyledStatusBarLeft = styled(StyledStatusBarSection)`
  flex-shrink: 1;
  min-width: 0;
  overflow: hidden;
`;
