import React from "react";
import { ItemStateContext } from "../Collections/ItemStateContext";
import { styled } from "../styled";
import { useContextOrThrow } from "../utils/useContextOrThrow";
import { useMenuItemLayout } from "@intellij-platform/core/Menu/MenuItem";

interface MenuItemLayoutProps {
  icon?: React.ReactNode;
  content: React.ReactNode;
  shortcut?: React.ReactNode;
}

const StyledMenuItemLayout = styled.div`
  display: flex;
  align-items: center;
  flex: 1; // to make sure it takes as much space as available in the menu item row, so that the suffix (shortcut) is pushed to the right
`;
const Content = styled.span`
  flex: 1;
`;

const Icon = styled.span`
  display: inline-flex; // prevents unwanted increased height
  min-width: 16px;
  margin-right: 5px;
  margin-left: -21px;
`;

const Shortcut = styled.kbd`
  font-family: system-ui, sans-serif;
  margin-left: 30px;
  margin-right: -0.625rem;
  color: ${({ theme }) =>
    theme.currentForegroundAware(
      theme.color("MenuItem.acceleratorForeground")
    )};
`;

export const MenuItemLayout = ({
  content,
  shortcut,
  icon,
}: MenuItemLayoutProps) => {
  const { isSelected } = useContextOrThrow(
    ItemStateContext,
    "MenuItemLayout is meant to be rendered in Item component in Menus"
  );
  const { labelProps, keyboardShortcutProps } = useMenuItemLayout();
  return (
    <StyledMenuItemLayout>
      <Icon>{!isSelected && icon}</Icon>
      <Content {...labelProps}>{content}</Content>
      {shortcut && <Shortcut {...keyboardShortcutProps}>{shortcut}</Shortcut>}
    </StyledMenuItemLayout>
  );
};
