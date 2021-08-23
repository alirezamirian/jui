import { useHover, useKeyboard } from "@react-aria/interactions";
import { useMenuItem } from "@react-aria/menu";
import { useOverlayPosition } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { Item } from "@react-stately/collections";
import { TreeState } from "@react-stately/tree";
import { Node } from "@react-types/shared";
import React, { Key } from "react";
import { css } from "styled-components";
import { PlatformIcon } from "../Icon/PlatformIcon";
import { LafIcon } from "../Icon/LafIcon";

import { styled } from "../styled";
import { UnknownThemeProp } from "../Theme/Theme";
import { Menu } from "./Menu";

export interface MenuItemProps<T> {
  item: Node<T>;
  state: TreeState<T>;
  onAction?: (key: Key) => void;
  onSubmenuClose?: () => void;
  expandOn?: "hover" | "press";
}

const StyledMenuItem = styled.li<{ isDisabled: boolean; isActive: boolean }>`
  position: relative; // for being able to position arrow icon absolutely
  outline: none;
  cursor: default;
  white-space: nowrap;
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
  // would be nice to have a visual clue for focus visible state, but it's not like that in intellij platform
  //border-left: 3px solid transparent;
  //&:focus-visible {
  //  border-left: 3px solid rgba(255, 255, 255, 0.1);
  //}
  padding: 0 20px 0 27px;
  line-height: 1.35; // to make the item have the right height
  display: flex;
  align-items: center;
`;

const StyledNestedArrow = styled.span`
  margin-right: -11px;
  margin-left: 11px;
  display: inline-flex; // to make it not take more height than the icon
`;

const StyledSelectedMark = styled.span`
  position: absolute;
  left: 4px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex; // to make it not take more height than the icon
`;

interface MenuItemContext {
  isSelected: boolean;
  isFocused: boolean;
  isDisabled: boolean;
}
export const MenuItemContext = React.createContext<MenuItemContext | null>(
  null
);

export function MenuItem<T>({
  item,
  state,
  onAction,
  expandOn,
}: MenuItemProps<T>) {
  // Get props for the menu item element
  const ref = React.useRef<HTMLLIElement>(null);
  const nestedMenuRef = React.useRef<HTMLDivElement>(null);
  const isDisabled = state.disabledKeys.has(item.key);
  const isExpanded = state.expandedKeys.has(item.key);
  const isSelected = state.selectionManager.selectedKeys.has(item.key);
  const isFocused = state.selectionManager.focusedKey === item.key;

  const { menuItemProps } = useMenuItem(
    {
      key: item.key,
      isDisabled,
      onAction: !item.hasChildNodes ? onAction : undefined,
    },
    state,
    ref
  );

  const maybeOpenSubmenu = () => {
    // Not the best way to clear expandedKeys, but current implementation of tree state only allows toggling keys
    state.expandedKeys.forEach((key) => {
      state.toggleKey(key);
    });
    if (item.hasChildNodes) {
      state.toggleKey(item.key);
    }
  };

  const { hoverProps } = useHover({
    isDisabled: isDisabled || expandOn !== "hover",
    onHoverStart: () => {
      maybeOpenSubmenu();
    },
  });

  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      if (["ArrowRight", "Enter", " "].includes(e.key)) {
        maybeOpenSubmenu();
      } else {
        e.continuePropagation();
      }
    },
  });

  let { overlayProps: positionProps } = useOverlayPosition({
    targetRef: ref,
    overlayRef: nestedMenuRef,
    placement: "right top",
    shouldFlip: true,
    offset: 1,
    isOpen: isExpanded,
  });

  const { subMenuProps } = useSubmenu({
    onClose: () => {
      state.toggleKey(item.key);
      // setting focus with selection manager didn't work. Perhaps because of patchy implementation of nested menus
      ref.current?.focus();
    },
  });

  return (
    <>
      <StyledMenuItem
        {...mergeProps(menuItemProps, hoverProps, keyboardProps)}
        isDisabled={isDisabled}
        isActive={isFocused}
        ref={ref}
      >
        {isSelected && (
          <StyledSelectedMark>
            <LafIcon
              icon={{
                name: "checkmark",
                modifiers: { Selected: isFocused },
              }}
            />
          </StyledSelectedMark>
        )}
        <MenuItemContext.Provider value={{ isDisabled, isFocused, isSelected }}>
          {item.rendered}
        </MenuItemContext.Provider>
        {item.hasChildNodes && (
          <StyledNestedArrow>
            <PlatformIcon icon="icons/ide/menuArrow" />
          </StyledNestedArrow>
        )}
      </StyledMenuItem>
      {isExpanded && (
        <div ref={nestedMenuRef} {...mergeProps(positionProps, subMenuProps)}>
          <Menu
            aria-label={item["aria-label"] || item.textValue}
            items={item.childNodes}
            disabledKeys={state.disabledKeys}
            selectedKeys={state.selectionManager.selectedKeys}
            onAction={onAction}
            autoFocus
          >
            {(childItem) => {
              // FIXME: This is not complete and doesn't support section and divider
              return (
                <Item
                  childItems={childItem.childNodes}
                  hasChildItems={childItem.hasChildNodes}
                  textValue={childItem.textValue}
                >
                  {childItem.rendered}
                </Item>
              );
            }}
          </Menu>
        </div>
      )}
    </>
  );
}

const useSubmenu = ({ onClose }: { onClose: () => void }) => {
  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      if (e.key === "ArrowLeft" || e.key === "Escape") {
        onClose();
      } else if (!["ArrowUp", "ArrowDown"].includes(e.key)) {
        e.continuePropagation();
      }
    },
  });
  return { subMenuProps: keyboardProps };
};
