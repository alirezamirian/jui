import React, { HTMLAttributes, RefObject } from "react";
import { useButton } from "@react-aria/button";
import { useMenuTrigger } from "@react-aria/menu";
import { useOverlay, useOverlayPosition } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { useMenuTriggerState } from "@react-stately/menu";
import { MenuTriggerProps as AriaMenuTriggerProps } from "@react-types/menu";

import { MenuOverlay } from "./MenuOverlay";
import { AriaButtonProps } from "@react-types/button";

export interface MenuTriggerProps
  extends Omit<AriaMenuTriggerProps, "closeOnSelect"> {
  restoreFocus?: boolean;
  // TODO: replace render function children with normal children, and utilize PressResponder. Add a story for the
  //  edge case of custom trigger, using PressResponder
  children: (
    props: HTMLAttributes<HTMLButtonElement>,
    ref: RefObject<any> // Using a generic didn't seem to work for some reason
  ) => React.ReactNode;
  // NOTE: there is a chance of unchecked breaking change here, since this is not explicitly mentioned as public API
  // of useButton, but it is passed to the underlying usePress.
  preventFocusOnPress?: boolean;
  /**
   * By default, the menu is positioned relative to the trigger. `positioningTargetRef` can be used to have the menu
   * positioned to another element. An example use case is when the menu trigger is a button inside some list item or
   * text box, but the menu semantically belongs to the container list item or text box.
   */
  positioningTargetRef?: React.RefObject<HTMLElement>;
  renderMenu: (props: {
    menuProps: React.HTMLAttributes<HTMLElement>;
  }) => React.ReactNode;
}

// FIXME: Escape doesn't close the menu
// FIXME: Focus is not restored if nested menu are opened. It may be solved by using useOverlay and closing submenu in click outside.
// FIXME: use PressResponder and replace render prop children with a normal react dom children. Issues with current impl:
//  disabled trigger doesn't work as expected. props passed to children fn is html props, which is limiting for button
//  components that don't accept arbitrary dom props.
/**
 * Makes its children a trigger for a menu, rendered via {@link MenuTriggerProps#renderMenu} prop.
 * Closes the menu when a menu action is triggered.
 */
export const MenuTrigger: React.FC<MenuTriggerProps> = ({
  children,
  renderMenu,
  direction = "bottom",
  align = "start",
  shouldFlip = true,
  restoreFocus = true,
  preventFocusOnPress = true,
  positioningTargetRef,
  ...otherProps
}) => {
  const menuTriggerProps: AriaMenuTriggerProps = {
    ...otherProps,
    direction,
    align,
    shouldFlip,
  };
  const state = useMenuTriggerState(menuTriggerProps);
  const triggerRef = React.useRef(null);
  const overlayRef = React.useRef(null);
  // FIXME: Menu props is not used, but it's just about labelBy and id. Only needed for accessibility, but it would
  //  require a `renderMenu` prop, instead of `menu`.
  const { menuTriggerProps: triggerProps, menuProps } = useMenuTrigger(
    { type: "menu" },
    state,
    triggerRef
  );
  const ariaButtonProps: AriaButtonProps<"button"> = {
    ...triggerProps,
    // @ts-expect-error: preventFocusOnPress is not defined in public API of useButton
    preventFocusOnPress,
  };
  const { buttonProps } = useButton(ariaButtonProps, triggerRef);
  const { overlayProps } = useOverlay(
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

  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: positioningTargetRef ?? triggerRef,
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
      <MenuOverlay
        overlayProps={mergeProps(overlayProps, positionProps)}
        overlayRef={overlayRef}
        state={state}
        restoreFocus={restoreFocus}
      >
        {renderMenu({ menuProps })}
      </MenuOverlay>
    </>
  );
};

function getPlacement(
  direction: Required<AriaMenuTriggerProps>["direction"],
  align: Required<AriaMenuTriggerProps>["align"]
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
