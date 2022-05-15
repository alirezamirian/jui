import React, { HTMLProps } from "react";
import { ActionButton } from "../ActionButton/ActionButton";
import { ActionToolbar } from "../ActionToolbar/ActionToolbar";
import { PlatformIcon } from "../Icon";
import { MenuTrigger } from "../Menu/MenuTrigger";
import { styled } from "../styled";
import { StyledHorizontalSeparator } from "../StyledSeparator";
import { UnknownThemeProp } from "../Theme/Theme";
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
      theme.color("ToolWindow.Header.borderColor" as UnknownThemeProp) ||
      theme.color("DefaultTabs.borderColor" as UnknownThemeProp) ||
      theme.commonColors.contrastBorder};
  background: ${({ theme, active }) =>
    active
      ? theme.color("ToolWindow.Header.background") ||
        theme.color(
          "ToolWindow.header.active.background" as UnknownThemeProp
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
          )}
          <MenuTrigger
            renderMenu={({ close, menuProps }) => {
              return (
                <ToolWindowSettingsIconMenu
                  close={close}
                  menuProps={menuProps}
                />
              );
            }}
          >
            {(props, ref) => (
              <ActionButton {...props} ref={ref}>
                <PlatformIcon icon="general/gearPlain" />
              </ActionButton>
            )}
          </MenuTrigger>
          <ActionButton onPress={hide}>
            <PlatformIcon icon="general/hideToolWindow" />
          </ActionButton>
        </ActionToolbar>
      </StyledToolWindowHeaderActions>
    </StyledToolWindowHeader>
  );
};
