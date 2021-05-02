import React from "react";
import { styled } from "../styled";
import { Theme } from "../Theme/createTheme";

export interface SpeedSearchPopupProps {
  children: string | undefined;
  match?: boolean;
  active: boolean | undefined;
}

/**
 * The little popup view shown at the top left corner of list, tree, etc., which shows the search
 * query.
 * TODO:
 *  - add magnifier icon
 */
export const SpeedSearchPopup: React.FC<SpeedSearchPopupProps> = ({
  active,
  match,
  children,
}) =>
  active ? (
    <StyledSpeedSearchPopup match={match}>
      {(children || "").replace(/ /g, "\u00A0")}
    </StyledSpeedSearchPopup>
  ) : null;

// TODO: these utils should go on theme
function getTooltipForeground(theme: Theme) {
  return theme.ui.ToolTip?.foreground || (theme.dark ? "#bfbfbf" : "#000000");
}

function getTooltipBackground(theme: Theme) {
  return theme.ui.ToolTip?.foreground || (theme.dark ? "#3c3f41" : "#f2f2f2");
}

function red(theme: Theme) {
  return theme.dark ? "rgb(255,100,100)" : "rgb(255,0,0)";
}

const StyledSpeedSearchPopup = styled.span<{ match?: boolean }>`
  // ref: https://github.com/JetBrains/intellij-community/blob/e3c7d96daba1d5d84d5650bde6c220aed225bfda/platform/platform-impl/src/com/intellij/ui/SpeedSearchBase.java#L53-L53
  box-sizing: border-box;
  position: absolute;
  background: ${({ theme }) =>
    theme.SpeedSearch?.background ||
    (theme.dark ? "rgb(111,111,111)" : "#fff")};
  border: 1px solid
    ${({ theme }) =>
      theme.SpeedSearch?.borderColor || theme.dark
        ? "rgb(64, 64, 64)"
        : "rgb(192, 192, 192)"};
  color: ${({ match, theme }) =>
    match
      ? theme.SpeedSearch?.foreground || getTooltipForeground(theme)
      : theme.SpeedSearch?.errorForeground || red(theme)};
  z-index: 1;
  padding: 3px 10px;
  height: 24px;
  transform: translateY(-100%);
`;
