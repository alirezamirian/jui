import React from "react";
import { styled } from "@intellij-platform/core";
import { SelectionAwareSpan } from "./SelectionAwareSpan";

export const StyledTreeNodeHint = styled(SelectionAwareSpan)`
  display: inline-flex;
  color: ${({ theme }) => theme.commonColors.inactiveTextColor};
  padding-left: 0.35rem;
`;
