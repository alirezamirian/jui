import React from "react";
import { Color, styled, UnknownThemeProp } from "@intellij-platform/core";
import { SelectionAwareSpan } from "../../../TreeUtils/SelectionAwareSpan";

export const StyledCurrentBranchTag = styled(SelectionAwareSpan)`
  margin-left: 0.3rem;
  display: inline-flex;
  align-self: center;
  height: 1.1rem;
  line-height: 1.1rem;
  padding: 0 0.25rem;

  background: ${({ theme }) =>
    new Color(
      theme.color(
        "VersionControl.RefLabel.backgroundBase",
        theme.dark ? "#fff" : "#000"
      )
    )
      .withTransparency(
        theme.value<number>("VersionControl.RefLabel.backgroundBrightness") ??
          0.08
      )
      .toString()};
  color: ${({ theme }) =>
    theme.color(
      "VersionControl.RefLabel.foreground" as UnknownThemeProp,
      theme.dark ? "#909090" : "#7a7a7a"
    )};
`;
