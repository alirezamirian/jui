import React, { HTMLAttributes, RefObject } from "react";
import { useButton } from "@react-aria/button";
import { AriaMenuOptions, useMenuTrigger } from "@react-aria/menu";
import { useOverlayPosition } from "@react-aria/overlays";
import { useMenuTriggerState } from "@react-stately/menu";
import { MenuTriggerProps as AriaMenuTriggerProps } from "@react-types/menu";

import { MenuOverlay } from "./MenuOverlay";
import { AriaButtonProps } from "@react-types/button";
import { Alignment } from "@react-types/shared";
import { PressResponder } from "@react-aria/interactions";

export interface MenuTriggerProps<E extends "button" | "a" = "button">
  extends Omit<AriaMenuTriggerProps, "closeOnSelect"> {
  restoreFocus?: boolean;
  // TODO: replace render function children with normal children, and utilize PressResponder. Add a story for the
  //  edge case of custom trigger, using PressResponder
  children:
    | ((
        props: "button" extends E
          ? HTMLAttributes<HTMLButtonElement>
          : HTMLAttributes<HTMLAnchorElement>,
        ref: RefObject<any> // Using a generic didn't seem to work for some reason
      ) => React.ReactNode)
    | React.ReactElement;
  // NOTE: there is a chance of unchecked breaking change here, since this is not explicitly mentioned as public API
  // of useButton, but it is passed to the underlying usePress.
  preventFocusOnPress?: boolean;
  /**
   * By default, the menu is positioned relative to the trigger. `positioningTargetRef` can be used to have the menu
   * positioned to another element. An example use case is when the menu trigger is a button inside some list item or
   * text box, but the menu semantically belongs to the container list item or text box.
   */
  positioningTargetRef?: React.RefObject<HTMLElement>;
  elementType?: E;
  renderMenu: (props: {
    // AriaMenuOptions contains more properties than needed
    menuProps: Pick<
      AriaMenuOptions<unknown>,
      "id" | "aria-labelledby" | "autoFocus" | "onClose"
    >;
  }) => React.ReactNode;
  suspense?: React.ReactNode;

  /**
   * Alignment of the menu relative to the trigger.
   * @default 'start'
   */
  align?: Alignment;
  /**
   * Where the Menu opens relative to its trigger.
   * @default 'bottom'
   */
  direction?: "bottom" | "top" | "left" | "right" | "start" | "end";
  /**
   * Whether the menu should automatically flip direction when space is limited.
   * @default true
   */
  shouldFlip?: boolean;
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
export const MenuTrigger = <E extends "button" | "a" = "button">({
  children,
  renderMenu,
  elementType = "button" as E,
  direction = "bottom",
  align = "start",
  shouldFlip = true,
  restoreFocus = true,
  preventFocusOnPress = true,
  suspense,
  positioningTargetRef,
  ...otherProps
}: MenuTriggerProps<E>) => {
  const state = useMenuTriggerState(otherProps);
  const triggerRef = React.useRef(null);
  const overlayRef = React.useRef(null);
  // FIXME: Menu props is not used, but it's just about labelBy and id. Only needed for accessibility, but it would
  //  require a `renderMenu` prop, instead of `menu`.
  const { menuTriggerProps: triggerProps, menuProps } = useMenuTrigger(
    { type: "menu" },
    state,
    triggerRef
  );
  const ariaButtonProps: AriaButtonProps<E> = {
    ...triggerProps,
    elementType,
    // @ts-expect-error: preventFocusOnPress is not defined in public API of useButton
    preventFocusOnPress,
  };
  const { buttonProps } = useButton(ariaButtonProps, triggerRef);

  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: positioningTargetRef ?? triggerRef,
    overlayRef,
    placement: getPlacement(direction, align),
    shouldFlip,
    offset: 0,
    containerPadding: 0,
    onClose: () => state.close(),
    isOpen: state.isOpen,
  });

  return (
    <>
      {typeof children === "function" ? (
        children(buttonProps, triggerRef)
      ) : (
        <PressResponder ref={triggerRef} {...buttonProps}>
          {children}
        </PressResponder>
      )}
      {state.isOpen && (
        <MenuOverlay
          overlayProps={positionProps}
          overlayRef={overlayRef}
          onClose={state.close}
          restoreFocus={restoreFocus}
          suspense={suspense}
        >
          {renderMenu({ menuProps })}
        </MenuOverlay>
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
