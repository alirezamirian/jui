import React from "react";
import { StyledActionButton } from "../ActionButton/ActionButton";
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
    margin: 1px 3px;
  }
  // NOTE: in the original implementation, there is no empty space between buttons, but buttons have kind of an
  // invisible left padding, which is mouse-intractable, but doesn't visually seem a part of the button.
  // Although implementable, it didn't seem necessary to follow the exact same thing. Margin should be fine.
  ${StyledActionButton} {
    margin: 0 2px 0 1px;
  }
`;

const StyledVerticalActionToolbar = styled(StyledActionToolbar)`
  flex-direction: column;
  padding: 0 2px;
  ${StyledVerticalSeparator} {
    margin: 4px 1px;
  }
  ${StyledActionButton} {
    margin: 2px 0 1px 0;
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
