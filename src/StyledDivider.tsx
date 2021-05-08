import { styled } from "./styled";
import React from "react";

export const StyledDivider = styled.hr(({ theme }) => ({
  backgroundColor: theme.color(
    // if this kind of fallback to *.{theSameKey} is repeated a lot, it can be baked into Theme.color
    "Separator.separatorColor",
    theme.color("*.separatorColor")
  ),
  margin: 0,
  border: "none",
}));

export const StyledHorizontalDivider = styled(StyledDivider)`
  height: 100%;
  width: 1px;
`;
export const StyledVerticalDivider = styled(StyledDivider)`
  height: 1px;
  width: 100%;
`;
