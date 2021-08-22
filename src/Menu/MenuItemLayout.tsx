import React from "react";
import { styled } from "../styled";

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
  color: ${({ theme }) => theme.color("MenuItem.acceleratorForeground")};
`;

export const MenuItemLayout = ({
  content,
  shortcut,
  icon,
}: MenuItemLayoutProps) => {
  return (
    <StyledMenuItemLayout>
      <Icon>{icon}</Icon>
      <Content>{content}</Content>
      <Shortcut>{shortcut}</Shortcut>
    </StyledMenuItemLayout>
  );
};
