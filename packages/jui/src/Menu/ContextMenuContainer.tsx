import React, { HTMLAttributes, HTMLProps } from "react";
import { mergeProps } from "@react-aria/utils";
import { useMenuTriggerState } from "@react-stately/menu";
import { OverlayTriggerProps } from "@react-types/overlays";

import { useContextMenu } from "./useContextMenu";
import { MenuOverlay } from "./MenuOverlay";

interface ContextMenuContainerProps extends HTMLProps<HTMLDivElement> {
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
export const ContextMenuContainer = ({
  children,
  renderMenu,
  ...props
}: ContextMenuContainerProps) => {
  const state = useMenuTriggerState({} as OverlayTriggerProps);

  const { overlayProps, containerProps, overlayRef } = useContextMenu(
    {},
    state
  );
  const allProps = mergeProps(props, containerProps);
  return (
    <>
      {typeof children === "function" ? (
        children(allProps)
      ) : (
        <div {...allProps}>{children}</div>
      )}
      <MenuOverlay
        state={state}
        overlayRef={overlayRef}
        overlayProps={overlayProps}
        restoreFocus
        /**
         * Context menus don't autofocus the first item in the reference impl.
         * Note that this just defines the default value, and can always be controlled per case on the rendered Menu
         */
        defaultAutoFocus={true}
      >
        {renderMenu()}
      </MenuOverlay>
    </>
  );
};
