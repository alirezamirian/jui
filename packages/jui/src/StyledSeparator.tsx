import React from "react";
import { styled } from "./styled";

type SeparatorUI = {
  STRIPE_INDENT: number;
  STRIPE_WIDTH: number;
};

// based on implementation in com.intellij.ide.ui.laf.darcula.ui.DarculaSeparatorUI, which seems to be used for all themes
const DarculaSeparatorUI: SeparatorUI = {
  STRIPE_INDENT: 1,
  STRIPE_WIDTH: 1,
};

const defaultSize =
  2 * DarculaSeparatorUI.STRIPE_INDENT + DarculaSeparatorUI.STRIPE_WIDTH;

export const StyledSeparator = styled.hr(({ theme }) => ({
  backgroundColor: theme.color(
    "Separator.separatorColor",
    theme.dark ? "#cdcdcd" : "#515151"
  ),
  backgroundClip: "content-box",
  boxSizing: "border-box",
  margin: 0,
  border: "none",
  flexShrink: 0,
}));

export const StyledHorizontalSeparator = styled(StyledSeparator)`
  height: inherit; // should it be auto?
  padding: 0 ${DarculaSeparatorUI.STRIPE_INDENT}px;
  width: ${defaultSize}px;
`;
export const StyledVerticalSeparator = styled(StyledSeparator)`
  width: auto;
  padding: ${DarculaSeparatorUI.STRIPE_INDENT}px 0;
  height: ${defaultSize}px;
`;
