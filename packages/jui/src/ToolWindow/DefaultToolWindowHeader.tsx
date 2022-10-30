import React, { HTMLProps } from "react";
import { ActionButton } from "@intellij-platform/core/ActionButton";
import { ActionToolbar } from "@intellij-platform/core/ActionToolbar/ActionToolbar";
import { PlatformIcon } from "@intellij-platform/core/Icon";
import { MenuTrigger } from "@intellij-platform/core/Menu/MenuTrigger";
import { ActionTooltip, TooltipTrigger } from "@intellij-platform/core/Tooltip";
import { styled } from "@intellij-platform/core/styled";
import { StyledHorizontalSeparator } from "@intellij-platform/core/StyledSeparator";
import { UnknownThemeProp } from "@intellij-platform/core/Theme/Theme";
import { useToolWindowState } from "./ToolWindowsState/ToolWindowStateProvider";
import {
  anchors,
  ToolWindowSettingsIconMenu,
} from "./ToolWindowSettingsIconMenu";

export interface ToolWindowHeaderProps
  extends Omit<HTMLProps<HTMLDivElement>, "ref" | "as"> {
  contentHasFocus?: boolean;
  additionalActions?: React.ReactNode;
}

const StyledToolWindowHeader = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
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
`;

export const DefaultToolWindowHeader: React.FC<ToolWindowHeaderProps> = ({
  children,
  additionalActions,
  contentHasFocus = false,
  ...otherProps
}) => {
  const { hide, state, changeViewMode } = useToolWindowState();
  return (
    <StyledToolWindowHeader active={contentHasFocus} {...otherProps}>
      <StyledToolWindowHeaderContent>{children}</StyledToolWindowHeaderContent>
      <StyledToolWindowHeaderActions>
        <ActionToolbar>
          {additionalActions && (
            <>
              {additionalActions}
              <StyledHorizontalSeparator />
            </>
          )}
          {state.viewMode === "float" && (
            <TooltipTrigger tooltip={<ActionTooltip actionName="Dock" />}>
              <ActionButton onPress={() => changeViewMode("docked_pinned")}>
                <PlatformIcon
                  icon={`actions/${
                    anchors.find(
                      ({ anchor, isSplit }) =>
                        anchor === state.anchor && isSplit === state.isSplit
                    )?.id
                  }`}
                />
              </ActionButton>
            </TooltipTrigger>
          )}
          <MenuTrigger
            renderMenu={({ menuProps }) => {
              return <ToolWindowSettingsIconMenu menuProps={menuProps} />;
            }}
          >
            {(props, ref) => (
              <TooltipTrigger
                tooltip={<ActionTooltip actionName="Show Options Menu" />}
              >
                <ActionButton {...props} ref={ref}>
                  <PlatformIcon icon="general/gearPlain" />
                </ActionButton>
              </TooltipTrigger>
            )}
          </MenuTrigger>
          <TooltipTrigger tooltip={<ActionTooltip actionName="Hide" />}>
            <ActionButton onPress={hide}>
              <PlatformIcon icon="general/hideToolWindow" />
            </ActionButton>
          </TooltipTrigger>
        </ActionToolbar>
      </StyledToolWindowHeaderActions>
    </StyledToolWindowHeader>
  );
};
