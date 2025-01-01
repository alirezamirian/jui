import React from "react";
import { RepoBranches } from "./branches.state";

export type BranchNameError = "EXISTING" | "CLASHING_WITH_REMOTE";

export function validateBranchName(
  branches: RepoBranches | null,
  newBranchName: string
): BranchNameError | null {
  if (
    branches?.remoteBranches.some(
      (remoteBranch) =>
        `${remoteBranch.remote}/${remoteBranch.name}` === newBranchName
    )
  ) {
    return "CLASHING_WITH_REMOTE";
  }
  if (branches?.localBranches.some(({ name }) => name === newBranchName)) {
    return "EXISTING";
  }
  return null;
}

// Almost borrowed from GitRefNameValidator
const ILLEGAL_CHARS_PATTERN = new RegExp(
  "(^\\.)|" + // begins with a dot
    "(^-)|" + // begins with '-'
    "(^/)|" + // begins with '/'
    "(\\.\\.)+|" + // two dots in a row
    "[ ~:^?*\\[\\\\]+|(@\\{)+|" + // contains invalid character: space, one of ~:^?*[\ or @{ sequence)
    `[${Array(32)
      .fill(null)
      .map((_, index) => String.fromCharCode(index))
      .join("")}u007F]`
);

export function cleanUpBranchName(branchName: string) {
  return branchName.replace(ILLEGAL_CHARS_PATTERN, "_");
}
