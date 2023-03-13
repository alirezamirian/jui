import React, { HTMLAttributes, RefObject, useContext } from "react";
import { useHover, usePress } from "@react-aria/interactions";
import {
  AriaMenuItemProps,
  MenuItemAria,
  useMenuItem as useMenuItemAria,
} from "@react-aria/menu";
import { OverlayContainer, useOverlayPosition } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { TreeState } from "@react-stately/tree";
import { FocusableElement, Node } from "@react-types/shared";
import { FocusScope } from "@intellij-platform/core/utils/FocusScope";
import { ItemStateContext } from "@intellij-platform/core/Collections/ItemStateContext";

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
  const {
    menuItemProps: { onMouseEnter, onPointerEnter, ...otherMenuItemProps },
    ...result
  } = useMenuItemAria(
    {
      key: item.key,
      // hack to prevent react-aria to call onClose when nested items are selected, which is incorrect, and because
      // react-aria doesn't officially support nested menus at the moment
      onClose: item.hasChildNodes ? () => {} : undefined,
    },
    state,
    ref
  );
  return {
    ...result,
    menuItemProps:
      submenuBehavior === "default" ||
      state.selectionManager.isFocused ||
      // If nothing is expanded, let top level menu items grab focus as well.
      // TODO: improve these conditions to a more generic one: if this menu item belongs to the "active" submenu.
      //  Which would be the last opened submenu, or deepest submenu.
      (item.parentKey == null && state.expandedKeys.size === 0)
        ? { onMouseEnter, onPointerEnter, ...otherMenuItemProps }
        : otherMenuItemProps,
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

  const { hoverProps } = useHover({
    isDisabled: isDisabled || submenuBehavior !== "default",
    onHoverStart: () => {
      if (!isExpanded) {
        state.toggleKey(item.key);
      }
    },
  });
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
        {...mergeProps(
          menuItemProps,
          hoverProps,
          keyboardProps,
          submenuBehavior === "toggleOnPress" ? togglePressProps : {}
        )}
        isDisabled={isDisabled}
        isActive={state.selectionManager.isFocused ? isFocused : isExpanded}
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
            <div ref={nestedMenuRef} {...positionProps}>
              {renderSubmenu({ parentState: state, rootKey: item.key })}
            </div>
          </FocusScope>
        </OverlayContainer>
      )}
    </>
  );
}
