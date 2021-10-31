import { Theme } from "jui/Theme";
import React from "react";
import { StyledActionButton } from "../ActionButton/ActionButton";
import { styled } from "../styled";
import {
  StyledHorizontalSeparator,
  StyledVerticalSeparator,
} from "../StyledSeparator";

interface ActionToolbarProps {
  orientation?: "vertical" | "horizontal";
  /**
   * Whether to include a border to the bottom/right the toolbar, or not.
   */
  hasBorder?: boolean;
}
const StyledActionToolbar = styled.div`
  display: flex;
`;

const getBorder = ({
  theme,
  hasBorder,
}: {
  theme: Theme;
  hasBorder?: boolean;
}) =>
  hasBorder
    ? `1px solid ${theme.color(
        "Borders.color",
        theme.dark ? "rgb(50,50,50)" : "rgb(192, 192, 192)"
      )}`
    : "none";
const StyledHorizontalActionToolbar = styled(StyledActionToolbar)<{
  hasBorder?: boolean;
}>`
  padding: 2px 0;
  border-bottom: ${getBorder};
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

const StyledVerticalActionToolbar = styled(StyledActionToolbar)<{
  hasBorder?: boolean;
}>`
  flex-direction: column;
  padding: 0 2px;
  border-right: ${getBorder};

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
  hasBorder = false,
  children,
}) => {
  return orientation === "horizontal" ? (
    <StyledHorizontalActionToolbar hasBorder={hasBorder}>
      {children}
    </StyledHorizontalActionToolbar>
  ) : (
    <StyledVerticalActionToolbar hasBorder={hasBorder}>
      {children}
    </StyledVerticalActionToolbar>
  );
};
