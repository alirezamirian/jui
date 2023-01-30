import React, { Key } from "react";
import { useHover, useKeyboard } from "@react-aria/interactions";
import { useMenuItem } from "@react-aria/menu";
import { OverlayContainer, useOverlayPosition } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { Item } from "@react-stately/collections";
import { TreeState } from "@react-stately/tree";
import { Node } from "@react-types/shared";
import { FocusScope } from "@intellij-platform/core/utils/FocusScope";
import { ItemStateContext } from "@intellij-platform/core/Collections/ItemStateContext";

import { LafIcon, PlatformIcon } from "../Icon";
import { styled } from "../styled";
import { Menu } from "./Menu";
import { MENU_BORDER_WIDTH, MENU_VERTICAL_PADDING } from "./StyledMenu";
import { StyledMenuItem } from "./StyledMenuItem";

export interface MenuItemProps<T> {
  item: Node<T>;
  state: TreeState<T>;
  onAction?: (key: Key) => void;
  onSubmenuClose?: () => void;
  expandOn?: "hover" | "press";
}

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

const StyledMenuItemText = styled.span`
  flex: 1;
`;

const StyledMenuItemPlatformIcon = styled(PlatformIcon)`
  svg path {
    stroke: currentColor;
  }
`;

const StyledMenuItemLafIcon = styled(LafIcon)`
  svg path {
    stroke: currentColor;
  }
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
    onClose: () => {
      console.log("on close");
    },
    offset: 0,
    crossOffset: -(MENU_VERTICAL_PADDING + MENU_BORDER_WIDTH),
    isOpen: isExpanded,
  });

  const { subMenuProps } = useSubmenu({
    onClose: () => {
      state.toggleKey(item.key);
      // setting focus with selection manager didn't work. Perhaps because of patchy implementation of nested menus
      ref.current?.focus();
    },
  });

  const isContainerFocused = state.selectionManager.isFocused || isExpanded;
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
            <StyledMenuItemLafIcon
              icon={{
                name: "checkmark",
                modifiers: { Selected: isFocused },
              }}
            />
          </StyledSelectedMark>
        )}
        <ItemStateContext.Provider
          value={{
            isDisabled,
            isContainerFocused: isContainerFocused,
            isSelected,
            node: item,
          }}
        >
          {typeof item.rendered === "string" ? (
            <StyledMenuItemText>{item.rendered}</StyledMenuItemText>
          ) : (
            item.rendered
          )}
        </ItemStateContext.Provider>
        {item.hasChildNodes && (
          <StyledNestedArrow>
            <StyledMenuItemPlatformIcon icon="icons/ide/menuArrow" />
          </StyledNestedArrow>
        )}
      </StyledMenuItem>
      {isExpanded && (
        /**
         * A note about using OverlayContainer and FocusScope here:
         * If sub-menu is not rendered in a portal, useOverlayPosition doesn't work properly and the submenu may
         * be rendered offscreen. Worse, it may introduce scroll in body (or some scrollable ancestor), which will
         * trigger a scroll event which closes the menu if the menu is rendered in an overlay (like in MenuTrigger),
         * which is almost always the case.
         * So we need to render in a portal and that's done by OverlayContainer. We also need to render a FocusScope,
         * because now that we are rendering in a portal, we are dom-wise outside the focus scope of the menu in
         * MenuTrigger (or any other implementation that renders menu in an overlay with a focus scope), and therefore
         * the autofocus behaviour for the nested menu doesn't work. That's because FocusScope works based on dom
         * tree, not react tree. Although it's not clear why this problem persists while `contain` is not set on the
         * FocusScope in MenuTrigger.
         * So we need focus scope. Rendering a FocusScope here messes with the `restoreFocus` behaviour of the one
         * in MenuTrigger, and that's why `forceRestoreFocus` is introduced in the locally implemented FocusScope.
         * In a nutshell:
         * Positioning -> need for OverlayContainer
         * using OverlayContainer -> need for FocusScope
         * FocusScope -> problem in focus restoration in MenuTrigger -> forceRestoreFocus as a patchy solution.
         */
        <OverlayContainer>
          <FocusScope>
            <div
              ref={nestedMenuRef}
              {...mergeProps(positionProps, subMenuProps)}
            >
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
          </FocusScope>
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
      } else if (!["ArrowUp", "ArrowDown"].includes(e.key)) {
        e.continuePropagation();
      }
    },
  });
  return { subMenuProps: keyboardProps };
};
