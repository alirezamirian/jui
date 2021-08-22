import { useHover, useKeyboard } from "@react-aria/interactions";
import { useMenuItem } from "@react-aria/menu";
import { OverlayContainer, useOverlayPosition } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { Item } from "@react-stately/collections";
import { TreeState } from "@react-stately/tree";
import { Node } from "@react-types/shared";
import React, { Key } from "react";
import { css } from "styled-components";
import { PlatformIcon } from "../Icon/PlatformIcon";

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
        {item.rendered}
        {item.hasChildNodes && (
          <StyledNestedArrow>
            <PlatformIcon icon="icons/ide/menuArrow" />
          </StyledNestedArrow>
        )}
      </StyledMenuItem>
      {isExpanded && (
        <OverlayContainer>
          <div ref={nestedMenuRef} {...mergeProps(positionProps, subMenuProps)}>
            <Menu items={item.childNodes} autoFocus>
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
        </OverlayContainer>
      )}
    </>
  );
}

const useSubmenu = ({ onClose }: { onClose: () => void }) => {
  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      if (e.key === "ArrowLeft" || e.key === "Escape") {
        onClose();
      } else {
        e.continuePropagation();
      }
    },
  });
  return { subMenuProps: keyboardProps };
};
