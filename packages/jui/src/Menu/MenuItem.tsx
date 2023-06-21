import React, { HTMLAttributes, RefObject, useContext } from "react";
import { isFocusVisible, useHover, usePress } from "@react-aria/interactions";
import {
  AriaMenuItemProps,
  MenuItemAria,
  useMenuItem as useMenuItemAria,
} from "@react-aria/menu";
import { useOverlayPosition } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { TreeState } from "@react-stately/tree";
import { FocusableElement, Node } from "@react-types/shared";
import { ItemStateContext } from "@intellij-platform/core/Collections/ItemStateContext";
import { Overlay } from "@intellij-platform/core/Overlay";

import { LafIcon, PlatformIcon } from "../Icon";
import { styled } from "../styled";
import { MenuContext, MenuProps } from "./Menu";
import { MENU_BORDER_WIDTH, MENU_VERTICAL_PADDING } from "./StyledMenu";
import {
  StyledMenuItem,
  StyledMenuItemIcon,
  StyledNestedArrow,
} from "./StyledMenuItem";
import { Submenu, SubmenuProps } from "@intellij-platform/core/Menu/Submenu";

export interface MenuItemProps<T> {
  item: Node<T>;
  state: TreeState<T>;
  onSubmenuClose?: () => void;
}

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

function useMenuItem<T extends unknown>(
  {
    submenuBehavior,
    ...props
  }: AriaMenuItemProps & { submenuBehavior: MenuProps<T>["submenuBehavior"] },
  state: TreeState<T>,
  ref: RefObject<FocusableElement>
): MenuItemAria {
  const item = state.collection.getItem(props.key!);
  const isDisabled = state.disabledKeys.has(item.key);
  const isExpanded = state.expandedKeys.has(item.key);
  const hasSubmenu = item.hasChildNodes;
  const { menuItemProps: ariaMenuItemProps, ...result } = useMenuItemAria(
    {
      key: item.key,
      // hack to prevent react-aria to call onClose when nested items are selected, which is incorrect, and because
      // react-aria doesn't officially support nested menus at the moment
      onClose: hasSubmenu ? () => {} : undefined,
    },
    state,
    ref
  );

  // useMenuItem in react aria utilizes useHover to focus item on hover. The logic there conflicts with nested menus
  // requirements (at least based on how nested menu is implemented here currently). Also, submenuBehavior requires
  // some more customization. So we delete the handlers set by useHover in useMenuItem, and add a custom useHover.
  delete ariaMenuItemProps.onMouseEnter;
  delete ariaMenuItemProps.onPointerEnter;

  if (submenuBehavior === "default" && isExpanded) {
    // When menu item has its submenu opened, clicking it should not move focus or do anything.
    delete ariaMenuItemProps.onPointerDown;
  }

  const { hoverProps } = useHover({
    isDisabled: isDisabled,
    onHoverStart: () => {
      const isAnySubmenuOpen = [...state.expandedKeys].some(
        (expandedKey) =>
          state.collection.getItem(expandedKey)?.parentKey === item.parentKey
      );

      if (submenuBehavior === "default" && !isExpanded) {
        state.toggleKey(item.key);
      }

      if (!isFocusVisible()) {
        const shouldFocus =
          submenuBehavior === "default" ? !isExpanded : !isAnySubmenuOpen;
        if (shouldFocus) {
          state.selectionManager.setFocused(true);
        }
        state.selectionManager.setFocusedKey(item.key);
      }
    },
  });

  const keyboardProps = {
    onKeyDown: (e: React.KeyboardEvent) => {
      if (
        ((e.key === "Enter" || e.key === " ") &&
          submenuBehavior !== "actionOnPress") ||
        "ArrowRight" === e.key
      ) {
        state.toggleKey(item.key);
        e.stopPropagation();
        return;
      }
    },
  };

  const { pressProps: togglePressProps } = usePress({
    isDisabled: isDisabled,
    onPressUp: () => {
      state.toggleKey(item.key);
      if (isExpanded) {
        // submenu was expanded and is closed now. moving focus back to the parent item
        state.selectionManager.setFocusedKey(item.key);
      }
    },
  });

  return {
    ...result,
    menuItemProps: mergeProps(
      hasSubmenu
        ? {
            "aria-expanded": isExpanded,
            "aria-haspopup": "menu",
          }
        : {},
      ariaMenuItemProps,
      hoverProps,
      keyboardProps,
      submenuBehavior === "toggleOnPress" ? togglePressProps : {}
    ),
  };
}

const MenuItemContext = React.createContext<{
  labelProps: HTMLAttributes<HTMLElement>;
  descriptionProps: HTMLAttributes<HTMLElement>;
  keyboardShortcutProps: HTMLAttributes<HTMLElement>;
}>({ descriptionProps: {}, labelProps: {}, keyboardShortcutProps: {} });

export const useMenuItemLayout = () => {
  return useContext(MenuItemContext);
};

export function MenuItem<T>({ item, state }: MenuItemProps<T>) {
  // Get props for the menu item element
  const ref = React.useRef<HTMLLIElement>(null);
  const nestedMenuRef = React.useRef<HTMLDivElement>(null);
  const isDisabled = state.disabledKeys.has(item.key);
  const isExpanded = state.expandedKeys.has(item.key);
  const isSelected = state.selectionManager.selectedKeys.has(item.key);
  const isFocused = state.selectionManager.focusedKey === item.key;
  const {
    onClose,
    submenuBehavior,
    renderSubmenu = (props: SubmenuProps<T>) => <Submenu {...props} />,
    itemWrapper = (i: React.ReactNode) => i,
  } = useContext(MenuContext);

  const { menuItemProps, labelProps, descriptionProps, keyboardShortcutProps } =
    useMenuItem(
      {
        submenuBehavior,
        key: item.key,
      },
      state,
      ref
    );

  const { pressProps: togglePressProps } = usePress({
    isDisabled: isDisabled,
    onPressUp: () => {
      state.toggleKey(item.key);
      if (isExpanded) {
        // submenu was expanded and is closed now. moving focus back to the parent item
        state.selectionManager.setFocusedKey(item.key);
      }
    },
  });

  let { overlayProps: positionProps } = useOverlayPosition({
    targetRef: ref,
    overlayRef: nestedMenuRef,
    placement: "right top",
    shouldFlip: true,
    onClose,
    offset: 0,
    crossOffset: -(MENU_VERTICAL_PADDING + MENU_BORDER_WIDTH),
    isOpen: isExpanded,
  });

  const arrowProps: HTMLAttributes<HTMLElement> =
    submenuBehavior !== "default"
      ? {
          role: "button",
          "aria-label": "Open",
          ...mergeProps(togglePressProps, {
            // to prevent pointer up event handler on the item, which would trigger action.
            onPointerUp: (e: React.PointerEvent) => e.stopPropagation(),
          }),
        }
      : {};
  return (
    <>
      <StyledMenuItem
        {...menuItemProps}
        isDisabled={isDisabled}
        isActive={isFocused}
        ref={ref}
      >
        {isSelected && (
          <StyledMenuItemIcon>
            <StyledMenuItemLafIcon
              icon={{
                name: "checkmark",
                modifiers: { Selected: isFocused },
              }}
            />
          </StyledMenuItemIcon>
        )}
        <ItemStateContext.Provider
          value={{
            isDisabled,
            isContainerFocused: state.selectionManager.isFocused,
            isSelected,
            node: item,
          }}
        >
          <MenuItemContext.Provider
            value={{ labelProps, descriptionProps, keyboardShortcutProps }}
          >
            {itemWrapper(
              typeof item.rendered === "string" ? (
                <StyledMenuItemText {...labelProps}>
                  {item.rendered}
                </StyledMenuItemText>
              ) : (
                item.rendered
              ),
              item
            )}
          </MenuItemContext.Provider>
        </ItemStateContext.Provider>
        {item.hasChildNodes && (
          <StyledNestedArrow {...arrowProps}>
            <StyledMenuItemPlatformIcon icon="icons/ide/menuArrow" />
          </StyledNestedArrow>
        )}
      </StyledMenuItem>
      {isExpanded && (
        /**
         * A note about using Overlay:
         * If sub-menu is not rendered in a portal, useOverlayPosition doesn't work properly and the submenu may
         * be rendered offscreen. Worse, it may introduce scroll in body (or some scrollable ancestor), which will
         * trigger a scroll event which closes the menu if the menu is rendered in an overlay (like in MenuTrigger),
         * which is almost always the case.
         */
        <Overlay>
          <div ref={nestedMenuRef} {...positionProps}>
            {renderSubmenu({ parentState: state, rootKey: item.key })}
          </div>
        </Overlay>
      )}
    </>
  );
}
