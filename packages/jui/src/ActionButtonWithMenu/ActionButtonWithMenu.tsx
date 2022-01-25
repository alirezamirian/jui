import React, { useRef } from "react";
import styled from "styled-components";
import {
  ActionButton,
  ActionButtonProps,
} from "@intellij-platform/core/ActionButton/ActionButton";
import { MenuTrigger, MenuTriggerProps } from "@intellij-platform/core/Menu";
import { PlatformIcon } from "@intellij-platform/core/Icon";
import { mergeProps } from "@react-aria/utils";

const ArrowIcon = styled(PlatformIcon)`
  position: absolute;
  right: 1px;
  bottom: 1px;
`;

type ActionButtonWithMenuProps = ActionButtonProps &
  Pick<MenuTriggerProps, "renderMenu"> & {
    /**
     * whether the default arrow should be removed or not. false by default.
     */
    noArrow?: boolean;
  };
/**
 * Renders an ActionButton which opens a menu. by default a down arrow icon is shown as an overlay on the rendered
 * icon, but it can be disabled by passing `noArrow`. It also restores the focus to the previously focused element,
 * when the menu is closed.
 * @param renderMenu: render prop for rendering the menu
 * @param children: the content of the action button
 * @param noArrow: whether the default arrow should be removed or not. false by default.
 * @param buttonProps: the rest of the props that will be passed down to ActionButton
 *
 * TODO: Add story and write test for focus restoration, noArrow, and basic functionality.
 */
export const ActionButtonWithMenu = ({
  renderMenu,
  children,
  noArrow = false,
  ...buttonProps
}: ActionButtonWithMenuProps) => {
  const previouslyFocusedElementRef = useRef<HTMLElement>();
  return (
    <MenuTrigger
      renderMenu={renderMenu}
      onOpenChange={(open) => {
        if (!open && previouslyFocusedElementRef.current) {
          previouslyFocusedElementRef.current.focus();
        }
      }}
    >
      {(props, ref) => (
        <ActionButton
          {...mergeProps(buttonProps, props, {
            onFocus: (e: FocusEvent) => {
              if (e.relatedTarget && e.relatedTarget instanceof HTMLElement) {
                previouslyFocusedElementRef.current = e.relatedTarget;
              }
            },
          })}
          ref={ref}
        >
          {children}
          {!noArrow && <ArrowIcon icon="general/dropdown.svg" />}
        </ActionButton>
      )}
    </MenuTrigger>
  );
};
