import React from "react";
import { ActionButton } from "../ActionButton/ActionButton";
import { ActionToolbar } from "../ActionToolbar/ActionToolbar";
import { PlatformIcon } from "../Icon/PlatformIcon";
import { styled } from "../styled";
import { StyledHorizontalDivider } from "../StyledDivider";
import { useToolWindowContext } from "./ToolWindowContextProvider";

export interface ToolWindowHeaderProps {
  toolWindowFocused?: boolean;
  additionalActions?: React.ReactNode;
}

const StyledToolWindowHeader = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 0 2px 0 7px;
  border-bottom: 1px solid
    ${({ theme }) =>
      theme.color("ToolWindow.Header.borderColor" as any) ||
      theme.color("DefaultTabs.borderColor" as any) ||
      theme.commonColors.contrastBorder};
  background: ${({ theme, active }) =>
    active
      ? theme.color("ToolWindow.Header.background") ||
        theme.color("ToolWindow.header.active.background" as any) ||
        "#E2E6EC"
      : theme.color("ToolWindow.Header.inactiveBackground") ||
        theme.color("ToolWindow.Header.background") ||
        "#ECECEC"};
`;
const StyledToolWindowHeaderActions = styled.div``;
const StyledToolWindowHeaderContent = styled.div`
  flex: 1;
`;
export const ToolWindowHeader: React.FC<ToolWindowHeaderProps> = ({
  children,
  additionalActions,
  toolWindowFocused = false,
}) => {
  const { hide } = useToolWindowContext();
  return (
    <StyledToolWindowHeader active={toolWindowFocused}>
      <StyledToolWindowHeaderContent>{children}</StyledToolWindowHeaderContent>
      <StyledToolWindowHeaderActions>
        <ActionToolbar>
          {additionalActions && (
            <>
              {additionalActions}
              <StyledHorizontalDivider />
            </>
          )}
          <ActionButton onPress={hide}>
            <PlatformIcon icon="general/hideToolWindow" />
          </ActionButton>
        </ActionToolbar>
      </StyledToolWindowHeaderActions>
    </StyledToolWindowHeader>
  );
};
