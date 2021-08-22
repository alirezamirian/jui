import React from "react";
import { styled } from "../styled";
import {
  StyledHorizontalSeparator,
  StyledVerticalSeparator,
} from "../StyledSeparator";

interface ActionToolbarProps {
  orientation?: "vertical" | "horizontal";
}
const StyledActionToolbar = styled.div`
  display: flex;
`;

const StyledHorizontalActionToolbar = styled(StyledActionToolbar)`
  padding: 2px 0;
  ${StyledHorizontalSeparator} {
    margin: 1px 4px;
  }
`;

const StyledVerticalActionToolbar = styled(StyledActionToolbar)`
  flex-direction: column;
  padding: 0 2px;
  ${StyledVerticalSeparator} {
    margin: 4px 1px;
  }
`;

/**
 * Remaining features:
 * - overflow behaviour:
 *   - wrap. like main action toolbar.
 *   - hidden, shown by arrow. Similar to actions in Git->Log. Note that the behaviour for horizontal and vertical
 *     modes are different apparently.
 */
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
