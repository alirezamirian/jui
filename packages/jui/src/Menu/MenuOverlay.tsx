import React, { HTMLProps } from "react";
import { MenuTriggerState } from "@react-stately/menu";
import { FocusScope } from "@intellij-platform/core/utils/FocusScope";
import { MenuOverlayContext } from "@intellij-platform/core/Menu/Menu";

/**
 * Overlay container for menu. Extracted into a separate component, to be used by components like MenuTrigger or
 * ContextMenuContainer, that need to render a menu as an overlay.
 * @private
 */
export function MenuOverlay({
  children,
  restoreFocus,
  overlayProps,
  overlayRef,
  state,
}: {
  children: React.ReactNode;
  restoreFocus?: boolean;
  overlayProps: HTMLProps<HTMLDivElement>;
  overlayRef: React.Ref<HTMLDivElement>;
  state: MenuTriggerState;
}) {
  if (!state.isOpen) {
    return null;
  }
  return (
    <FocusScope
      restoreFocus={restoreFocus}
      forceRestoreFocus={restoreFocus}
      autoFocus
    >
      <MenuOverlayContext.Provider value={state}>
        <div {...overlayProps} ref={overlayRef}>
          {children}
        </div>
      </MenuOverlayContext.Provider>
    </FocusScope>
  );
}
