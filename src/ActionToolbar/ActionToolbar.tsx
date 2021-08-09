import React from "react";
import { styled } from "../styled";
import {
  StyledHorizontalDivider,
  StyledVerticalDivider,
} from "../StyledDivider";

interface ActionToolbarProps {
  orientation?: "vertical" | "horizontal";
}
const StyledActionToolbar = styled.div`
  display: flex;
`;

const StyledHorizontalActionToolbar = styled(StyledActionToolbar)`
  padding: 2px 0;
  ${StyledHorizontalDivider} {
    margin: 1px 4px;
  }
`;

const StyledVerticalActionToolbar = styled(StyledActionToolbar)`
  flex-direction: column;
  padding: 0 2px;
  ${StyledVerticalDivider} {
    margin: 4px 1px;
  }
`;

// Maybe not needed
export const ActionToolbar: React.FC<ActionToolbarProps> = ({
  orientation = "horizontal",
  children,
}) => {
  return orientation === "horizontal" ? (
    <StyledHorizontalActionToolbar>{children}</StyledHorizontalActionToolbar>
  ) : (
    <StyledVerticalActionToolbar>{children}</StyledVerticalActionToolbar>
  );
};
