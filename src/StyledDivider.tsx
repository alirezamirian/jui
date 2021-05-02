import { styled } from "./styled";
import React from "react";

export const StyledDivider = styled.hr(({ theme }) => ({
  backgroundColor:
    theme.ui.Separator?.separatorColor || theme.ui["*"].separatorColor,
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
