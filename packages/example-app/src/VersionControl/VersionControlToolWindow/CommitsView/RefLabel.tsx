import { styled, Theme } from "@intellij-platform/core";
import React from "react";

import { StyledCurrentBranchTag } from "../../Changes/ChangesView/StyledCurrentBranchTag";
import { GitRef } from "./GitRef";

const labelIcon = (
  <path
    fill="currentColor"
    d="M4.2 4.8 C4.8627 4.8 5.4 5.3373 5.4 6 C5.4 6.6627 4.8627 7.2 4.2 7.2 C3.5373 7.2 3 6.6627 3 6 C3 5.3373 3.5373 4.8 4.2 4.8 ZM0.6 2.4 L0.6 7.2 L7.8 14.4 L12.6 9.6 L5.4 2.4 Z"
  />
);
const vcsLogStandardColors = {
  TIP: { light: "#ffd100", dark: "#e1c731" },
  LEAF: { light: "#8a2d6b", dark: "#c31e8c" },
  BRANCH: { light: "#3cb45c", dark: "#3cb45c" },
  BRANCH_REF: { light: "#9f79b5", dark: "#9f79b5" },
  TAG: { light: "#7a7a7a", dark: "#999999" },
};
const gitLogColors: Record<GitRef["type"], (args: { theme: Theme }) => string> =
  {
    head: ({ theme }: { theme: Theme }) =>
      theme.color(
        "VersionControl.GitLog.headIconColor",
        vcsLogStandardColors.TIP
      ),
    localBranch: ({ theme }: { theme: Theme }) =>
      theme.color(
        "VersionControl.GitLog.localBranchIconColor",
        vcsLogStandardColors.BRANCH
      ),
    remoteBranch: ({ theme }: { theme: Theme }) =>
      theme.color(
        "VersionControl.GitLog.remoteBranchIconColor",
        vcsLogStandardColors.BRANCH_REF
      ),
    tag: ({ theme }: { theme: Theme }) =>
      theme.color(
        "VersionControl.GitLog.tagIconColor",
        vcsLogStandardColors.TAG
      ),
  };

const StyledRef = styled(StyledCurrentBranchTag)`
  border-radius: 3px;
  align-items: stretch;
  font-size: 0.75rem;
`;

const StyledLabelSvg = styled.svg.attrs({ viewBox: "0 0 14.5 14.5" })<{
  type: GitRef["type"];
}>`
  width: 1rem;
  height: 1rem;
  stroke: rgba(0, 0, 0, 0.25);
  stroke-width: 0.5px;
  color: ${({ type, theme }) => gitLogColors[type]({ theme })};
  z-index: 1; // for the right vertical order of grouped labels
  &:not(:first-child) {
    margin-right: -11px;
  }
`;

const StyledRefIconGroup = styled.span`
  display: inline-flex;
  flex-direction: row-reverse;
`;

const StyledLabelText = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
`;

export function RefIcon({ type }: { type: GitRef["type"] }) {
  return <StyledLabelSvg type={type}>{labelIcon}</StyledLabelSvg>;
}

export function RefIconGroup({ types }: { types: Array<GitRef["type"]> }) {
  return (
    <StyledRefIconGroup>
      {types.map((type, index) => (
        <StyledLabelSvg key={index} type={type}>
          {labelIcon}
        </StyledLabelSvg>
      ))}
    </StyledRefIconGroup>
  );
}
export function RefLabel({
  types,
  children,
}: {
  types: Array<GitRef["type"]>;
  children: React.ReactNode;
}) {
  return (
    <StyledRef>
      <RefIconGroup types={types} />
      <StyledLabelText>{children}</StyledLabelText>
    </StyledRef>
  );
}
