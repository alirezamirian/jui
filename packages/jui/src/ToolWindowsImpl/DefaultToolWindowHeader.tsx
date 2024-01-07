import React, { HTMLProps } from "react";
import { IconButton } from "@intellij-platform/core/IconButton";
import { Toolbar } from "@intellij-platform/core/Toolbar/Toolbar";
import { PlatformIcon } from "@intellij-platform/core/Icon";
import { MenuTrigger } from "@intellij-platform/core/Menu/MenuTrigger";
import { ActionTooltip, TooltipTrigger } from "@intellij-platform/core/Tooltip";
import { styled } from "@intellij-platform/core/styled";
import { StyledHorizontalSeparator } from "@intellij-platform/core/StyledSeparator";
import { UnknownThemeProp } from "@intellij-platform/core/Theme/Theme";
import { ToolWindowSettingsIconMenu } from "./ToolWindowSettingsIconMenu";
import {
  DOCK_TOOL_WINDOW_ACTION_ID,
  HIDE_ACTIVE_WINDOW_ACTION_ID,
} from "./ToolWindowActionIds";
import { ActionButton } from "@intellij-platform/core/ActionSystem/components";

export interface ToolWindowHeaderProps
  extends Omit<HTMLProps<HTMLDivElement>, "ref" | "as"> {
  contentHasFocus?: boolean;
  additionalActions?: React.ReactNode;
}

const StyledToolWindowHeader = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: end; // to have the content overflow from right, as the toolwindow shrinks. That will keep the left-most buttons in the view
  padding: 0 2px 0 4px;
  overflow: hidden; // for the negative margin applied on StyledToolWindowHeaderActions
  border-bottom: 1px solid
    ${({ theme }) =>
      theme.color(
        "ToolWindow.Header.borderColor" as UnknownThemeProp<"ToolWindow.Header.borderColor">
      ) ||
      theme.color("DefaultTabs.borderColor") ||
      theme.commonColors.contrastBorder};
  background: ${({ theme, active }) =>
    active
      ? theme.color("ToolWindow.Header.background") ||
        theme.color(
          "ToolWindow.header.active.background" as UnknownThemeProp<"ToolWindow.header.active.background">
        ) ||
        "#E2E6EC"
      : theme.color("ToolWindow.Header.inactiveBackground") ||
        theme.color("ToolWindow.Header.background") ||
        "#ECECEC"};
`;

const StyledToolWindowHeaderActions = styled.div`
  margin-right: -4px;
`;

const StyledToolWindowHeaderContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const DefaultToolWindowHeader: React.FC<ToolWindowHeaderProps> = ({
  children,
  additionalActions,
  contentHasFocus = false,
  ...otherProps
}) => {
  return (
    <StyledToolWindowHeader active={contentHasFocus} {...otherProps}>
      <StyledToolWindowHeaderContent>{children}</StyledToolWindowHeaderContent>
      <StyledToolWindowHeaderActions>
        <Toolbar>
          {additionalActions && (
            <>
              {additionalActions}
              <StyledHorizontalSeparator />
            </>
          )}
          <ActionButton actionId={DOCK_TOOL_WINDOW_ACTION_ID} />
          <MenuTrigger
            renderMenu={({ menuProps }) => {
              return <ToolWindowSettingsIconMenu menuProps={menuProps} />;
            }}
          >
            {(props, ref) => (
              <TooltipTrigger tooltip={<ActionTooltip actionName="Options" />}>
                <IconButton {...props} ref={ref}>
                  <PlatformIcon icon="general/gearPlain" />
                </IconButton>
              </TooltipTrigger>
            )}
          </MenuTrigger>
          <ActionButton actionId={HIDE_ACTIVE_WINDOW_ACTION_ID} />
        </Toolbar>
      </StyledToolWindowHeaderActions>
    </StyledToolWindowHeader>
  );
};
