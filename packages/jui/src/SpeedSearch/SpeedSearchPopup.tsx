import { PlatformIcon } from "@intellij-platform/core/Icon";
import React from "react";
import { styled } from "../styled";

export interface SpeedSearchPopupProps {
  children: string | undefined;
  match?: boolean;
  active: boolean | undefined;
}

const StyledSearchIcon = styled(PlatformIcon)`
  margin-right: 10px;
  vertical-align: middle;
`;

/**
 * The little popup view shown in the top left corner of list, tree, etc., which shows the search
 * query.
 * @see SpeedSearchInput
 */
export const SpeedSearchPopup = React.forwardRef<
  HTMLElement,
  SpeedSearchPopupProps
>(({ active, match, children }, ref) =>
  active ? (
    <StyledSpeedSearchPopup ref={ref} noMatch={!match}>
      <StyledSearchIcon icon={"actions/search"} />
      {(children || "").replace(/ /g, "\u00A0")}
    </StyledSpeedSearchPopup>
  ) : null
);

const StyledSpeedSearchPopup = styled.span<{ noMatch?: boolean }>`
  // ref: https://github.com/JetBrains/intellij-community/blob/e3c7d96daba1d5d84d5650bde6c220aed225bfda/platform/platform-impl/src/com/intellij/ui/SpeedSearchBase.java#L53-L53
  box-sizing: border-box;
  position: absolute;
  background: ${({ theme }) =>
    theme.color(
      "SpeedSearch.background",
      theme.dark ? "rgb(111,111,111)" : "#fff"
    )};
  border: 1px solid
    ${({ theme }) =>
      theme.color(
        "SpeedSearch.borderColor",
        theme.dark ? "rgb(64, 64, 64)" : "rgb(192, 192, 192)"
      )};
  color: ${({ noMatch, theme }) =>
    noMatch
      ? theme.color("SpeedSearch.errorForeground", theme.commonColors.red)
      : theme.color(
          "SpeedSearch.foreground",
          theme.commonColors.tooltipForeground
        )};
  z-index: 1;
  padding: 3px 7px;
  height: 25px;
  line-height: 1.2;
  transform: translateY(-100%);
`;
