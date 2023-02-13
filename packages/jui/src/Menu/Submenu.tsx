import React, { useContext, useEffect, useRef } from "react";
import { TreeState } from "@react-stately/tree";
import { useMenu } from "@react-aria/menu";
import { Node } from "@react-types/shared";
import { mergeProps } from "@react-aria/utils";
import { MenuKeyboardDelegate, useSubmenu } from "./_useSubmenu";
import { useSubmenuState } from "@intellij-platform/core/Menu/_useSubmenuState";
import { MenuContext } from "./Menu";
import { StyledMenu } from "./StyledMenu";
import { renderMenuNode } from "./renderMenuNode";

export function Submenu<T>({
  parentState,
  rootKey,
}: {
  parentState: TreeState<T>;
  rootKey: React.Key;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const state = useSubmenuState(parentState);
  const {
    submenuBehavior,
    autoFocus = true,
    ...parentMenuProps
  } = useContext(MenuContext);

  const rootItem = state.collection.getItem(rootKey);
  let { menuProps } = useMenu(
    {
      "aria-label": rootItem?.["aria-label"] || rootItem?.textValue,
      ...parentMenuProps,
      selectedKeys: state.selectionManager.selectedKeys,
      keyboardDelegate: new MenuKeyboardDelegate(
        rootKey,
        state.collection,
        state.disabledKeys,
        ref
      ),
      autoFocus,
    },
    state,
    ref
  );
  const { submenuProps } = useSubmenu({ rootKey }, parentState, ref);

  const submenuBehaviorProps = {
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        // Close the menu and submenu root node.
        state.toggleKey(rootKey);
        state.selectionManager.setFocusedKey(rootKey);
        parentState.selectionManager.setFocused(true);
        if (submenuBehavior !== "default") {
          e.stopPropagation();
        }
        return;
      }
    },
  };

  useEffect(() => {
    setTimeout(() => {
      // we need this hack until the nested menu is properly supported. That's because when the element is hovered
      // it sets the focus key, which will move focus to that item.
      ref.current?.focus();
    });
  }, []);

  return (
    <StyledMenu
      {...mergeProps(menuProps, submenuProps, submenuBehaviorProps)}
      ref={ref}
    >
      {[...(rootKey ? rootItem?.childNodes || [] : state.collection)].map(
        (node: Node<T>) => renderMenuNode(state, node)
      )}
    </StyledMenu>
  );
}
