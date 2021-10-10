import { useButton } from "@react-aria/button";
import { useMenuTrigger } from "@react-aria/menu";
import {
  OverlayContainer,
  useOverlay,
  useOverlayPosition,
} from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { useMenuTriggerState } from "@react-stately/menu";
import { MenuTriggerProps } from "@react-types/menu";
import React, { HTMLProps, RefObject } from "react";
import { FocusScope } from "../ToolWindow/FocusScope";

interface Props extends MenuTriggerProps {
  restoreFocus?: boolean;
  children: (
    props: HTMLProps<HTMLElement>,
    ref: RefObject<any> // Using a generic didn't seem to work for some reason
  ) => React.ReactNode;
  renderMenu: (props: {
    close: () => void;
    menuProps: React.HTMLAttributes<HTMLElement>;
  }) => React.ReactNode;
}

// FIXME: closeOnSelect should either work or be removed
// FIXME: Escape doesn't close the menu
// FIXME: Focus is not restored if nested menu are opened. It may be solved by using useOverlay and closing submenu in click outside.
// TODO: introduce a more generic Overlay component and use it here too.
export const MenuTrigger: React.FC<Props> = ({
  children,
  renderMenu,
  direction = "bottom",
  align = "start",
  shouldFlip = true,
  restoreFocus = false,
  ...otherProps
}) => {
  const menuTriggerProps: MenuTriggerProps = {
    ...otherProps,
    direction,
    align,
    shouldFlip,
  };
  let state = useMenuTriggerState(menuTriggerProps);
  let triggerRef = React.useRef(null);
  let overlayRef = React.useRef(null);
  // FIXME: Menu props is not used, but it's just about labelBy and id. Only needed for accessibility, but it would
  //  require a `renderMenu` prop, instead of `menu`.
  let { menuTriggerProps: triggerProps, menuProps } = useMenuTrigger(
    { type: "menu" },
    state,
    triggerRef
  );
  let { buttonProps } = useButton(triggerProps, triggerRef);
  let { overlayProps } = useOverlay(
    {
      onClose: () => {
        return state.close();
      },
      shouldCloseOnBlur: false,
      isOpen: state.isOpen,
      isKeyboardDismissDisabled: false,
      isDismissable: true,
      shouldCloseOnInteractOutside: (element) => {
        // FIXME: this is kind of hacky and should be removed when nested menu is properly supported
        return !element.matches("[role=menu] *");
      },
    },
    overlayRef
  );

  let { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement: getPlacement(direction, align),
    shouldFlip,
    offset: 0,
    containerPadding: 0,
    isOpen: state.isOpen,
  });

  return (
    <>
      {children(buttonProps, triggerRef)}
      {state.isOpen && (
        <OverlayContainer>
          <FocusScope
            restoreFocus={restoreFocus}
            forceRestoreFocus={restoreFocus}
            autoFocus
          >
            <div {...mergeProps(overlayProps, positionProps)} ref={overlayRef}>
              {renderMenu({ menuProps, close: () => state.close() })}
            </div>
          </FocusScope>
        </OverlayContainer>
      )}
    </>
  );
};

function getPlacement(
  direction: Required<MenuTriggerProps>["direction"],
  align: Required<MenuTriggerProps>["align"]
) {
  switch (direction) {
    case "left":
    case "right":
    case "start":
    case "end":
      return `${direction} ${align === "end" ? "bottom" : "top"}` as const;
    case "bottom":
    case "top":
    default:
      return `${direction} ${align}` as const;
  }
}
