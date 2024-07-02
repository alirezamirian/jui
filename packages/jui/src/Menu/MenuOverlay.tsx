import React, { HTMLProps } from "react";
import { MenuTriggerState } from "@react-stately/menu";
import { FocusScope } from "@intellij-platform/core/utils/FocusScope";
import {
  MenuOverlayContext,
  MenuProps,
} from "@intellij-platform/core/Menu/Menu";
import { Overlay } from "@intellij-platform/core/Overlay";

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
  defaultAutoFocus,
  state,
}: {
  children: React.ReactNode;
  restoreFocus?: boolean;
  overlayProps: HTMLProps<HTMLDivElement>;
  overlayRef: React.Ref<HTMLDivElement>;
  /**
   * Sets the default value of {@link Menu}'s {@link MenuProps#autoFocus} prop.
   */
  defaultAutoFocus?: MenuProps<unknown>["autoFocus"];
  state: MenuTriggerState;
}) {
  if (!state.isOpen) {
    return null;
  }
  return (
    <Overlay>
      <FocusScope restoreFocus={restoreFocus} autoFocus>
        <MenuOverlayContext.Provider
          value={{
            ...state,
            defaultAutoFocus,
          }}
        >
          <div {...overlayProps} ref={overlayRef}>
            {children}
          </div>
        </MenuOverlayContext.Provider>
      </FocusScope>
    </Overlay>
  );
}
