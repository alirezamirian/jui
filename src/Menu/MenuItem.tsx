import { useMenuItem } from "@react-aria/menu";
import { TreeState } from "@react-stately/tree";
import { Node } from "@react-types/shared";
import React, { Key } from "react";
import { css } from "styled-components";
import { PlatformIcon } from "../Icon/PlatformIcon";

import { styled } from "../styled";
import { UnknownThemeProp } from "../Theme/Theme";

export interface MenuItemProps<T> {
  item: Node<T>;
  state: TreeState<T>;
  onAction?: (key: Key) => void;
}

const StyledMenuItem = styled.li<{ isDisabled: boolean; isActive: boolean }>`
  position: relative; // for being able to position arrow icon absolutely
  outline: none;
  cursor: default;
  color: ${({ isActive, isDisabled, theme }) => {
    if (isDisabled) {
      return theme.color("MenuItem.disabledForeground");
    }
    if (isActive) {
      return theme.color("MenuItem.selectionForeground" as UnknownThemeProp);
    }
    return theme.color("MenuItem.foreground" as UnknownThemeProp);
  }};
  ${({ isActive, theme }) =>
    isActive &&
    css`
      background: ${theme.color(
        "MenuItem.selectionBackground" as UnknownThemeProp
      )};
      color: ${undefined};
      // Kind of a solution for hard coded fill values in svg icons. Is there a better approaches?
      svg {
        filter: brightness(2);
      }
    `}
  padding: 0 19px 0 27px;
  line-height: 1.65; // to make the item have the right height
`;

const StyledNestedArrow = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 7px;
  display: inline-flex; // to make it not take more height than the icon
`;

export function MenuItem<T>({ item, state, onAction }: MenuItemProps<T>) {
  // Get props for the menu item element
  const ref = React.useRef<HTMLLIElement>(null);
  const isDisabled = state.disabledKeys.has(item.key);
  const isFocused = state.selectionManager.focusedKey === item.key;

  const { menuItemProps } = useMenuItem(
    {
      key: item.key,
      isDisabled,
      onAction,
    },
    state,
    ref
  );

  return (
    <StyledMenuItem
      {...menuItemProps}
      isDisabled={isDisabled}
      isActive={isFocused}
      ref={ref}
    >
      {item.rendered}
      {item.hasChildNodes && (
        <StyledNestedArrow>
          <PlatformIcon icon="icons/ide/menuArrow" />
        </StyledNestedArrow>
      )}
    </StyledMenuItem>
  );
}
