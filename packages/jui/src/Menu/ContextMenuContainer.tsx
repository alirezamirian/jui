import React, { ForwardedRef, HTMLAttributes, HTMLProps } from "react";
import { mergeProps } from "@react-aria/utils";
import { useMenuTriggerState } from "@react-stately/menu";
import { OverlayTriggerProps } from "@react-types/overlays";

import { useContextMenu, UseContextMenuProps } from "./useContextMenu";
import { MenuOverlayFromOrigin } from "@intellij-platform/core/Menu/MenuOverlayFromOrigin";

interface ContextMenuContainerProps
  extends Omit<HTMLProps<HTMLDivElement>, "children">,
    UseContextMenuProps {
  // TODO(api): change renderMenu to menu which would be a react element.
  /**
   * Will be called to return the Menu when context menu is triggered. Use {@link Menu} component to render a menu.
   */
  renderMenu: () => React.ReactNode;
  /**
   * If children is a function, context menu props is passed to it, to be passed to the underlying element.
   * Otherwise, a div container will be rendered.
   */
  children:
    | React.ReactNode
    | ((props: HTMLAttributes<HTMLElement>) => React.ReactNode);
}

/**
 * A generic container for context menu. It's the same as a normal div, only with an additional `renderMenu` prop,
 * to be used to render context menu, when it's triggered.
 * Closes the menu when a menu action is triggered.
 */
export const ContextMenuContainer = React.forwardRef(
  (
    {
      children,
      renderMenu,
      onOpen,
      isDisabled,
      ...props
    }: ContextMenuContainerProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const state = useMenuTriggerState({} as OverlayTriggerProps);

    const { positionOrigin, containerProps, overlayRef } = useContextMenu(
      { onOpen, isDisabled },
      state
    );
    const allProps = mergeProps(props, containerProps);
    return (
      <>
        {typeof children === "function" ? (
          children(allProps)
        ) : (
          <div {...allProps} ref={ref}>
            {children}
          </div>
        )}
        {state.isOpen && (
          <MenuOverlayFromOrigin
            onClose={state.close}
            ref={overlayRef}
            origin={positionOrigin}
            /**
             * Context menus don't autofocus the first item in the reference impl.
             * Note that this just defines the default value, and can always be controlled per case on the rendered Menu
             */
            defaultAutoFocus={true}
          >
            {renderMenu()}
          </MenuOverlayFromOrigin>
        )}
      </>
    );
  }
);

/**
 * Data attribute name to be used to mark an element as the reference for positioning a contextual menu.
 */
export const MENU_POSITION_TARGET_DATA_ATTRIBUTE =
  "data-context-menu-position-target";
