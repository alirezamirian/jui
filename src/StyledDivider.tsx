import { styled } from "./styled";
import React from "react";

const StyledDivider = styled.hr(({ theme }) => ({
  backgroundColor: theme.color(
    "Separator.separatorColor",
    theme.dark ? "#cdcdcd" : "#515151"
  ),
  margin: 0,
  border: "none",
}));

export const StyledHorizontalDivider = styled(StyledDivider)`
  height: inherit;
  width: 1px;
`;
export const StyledVerticalDivider = styled(StyledDivider)`
  height: 1px;
  width: inherit;
`;
