import React, { HTMLProps } from "react";
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

  return (
    <div {...mergeProps(props, containerProps)}>
      {children}
      <MenuOverlay
        state={state}
        overlayRef={overlayRef}
        overlayProps={overlayProps}
        restoreFocus
      >
        {renderMenu()}
      </MenuOverlay>
    </div>
  );
};
