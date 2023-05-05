import React, { useContext, useEffect, useRef } from "react";
import { TreeState } from "@react-stately/tree";
import { AriaMenuOptions, useMenu } from "@react-aria/menu";
import { mergeProps } from "@react-aria/utils";

import {
  MenuKeyboardDelegate,
  useSubmenu as useSubmenuAria,
} from "./_useSubmenu";
import { useSubmenuState } from "./_useSubmenuState";
import { MenuContext } from "./Menu";
import { StyledMenu } from "./StyledMenu";
import { renderMenuNodes } from "./renderMenuNodes";

export function useSubmenu<T>(
  {
    rootKey,
    parentState,
    keyboardDelegate,
  }: { rootKey: React.Key; parentState: TreeState<T> } & Pick<
    AriaMenuOptions<T>,
    "keyboardDelegate"
  >,
  state: TreeState<T>,
  ref: React.RefObject<HTMLElement>
) {
  const rootItem = state.collection.getItem(rootKey);
  const {
    submenuBehavior,
    autoFocus = true,
    onClose,
    onAction,
  } = useContext(MenuContext);
  let { menuProps } = useMenu(
    {
      "aria-label": rootItem?.["aria-label"] || rootItem?.textValue,
      onAction,
      onClose,
      selectedKeys: state.selectionManager.selectedKeys,
      keyboardDelegate:
        keyboardDelegate ||
        new MenuKeyboardDelegate(
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
  const { submenuProps } = useSubmenuAria({ rootKey }, parentState, ref);

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
      // noinspection PointlessBooleanExpressionJS seems to be false positive. autoFocus can be "first" or "last"
      if (autoFocus === true) {
        ref.current?.focus();
      }
    });
  }, []);

  return {
    submenuProps: mergeProps(menuProps, submenuProps, submenuBehaviorProps),
  };
}

export interface SubmenuProps<T> {
  parentState: TreeState<T>;
  rootKey: React.Key;
}

export function Submenu<T>({ parentState, rootKey }: SubmenuProps<T>) {
  const ref = useRef<HTMLUListElement>(null);
  const state = useSubmenuState(parentState);
  const rootItem = state.collection.getItem(rootKey);

  const { submenuProps } = useSubmenu({ rootKey, parentState }, state, ref);

  return (
    <StyledMenu {...submenuProps} ref={ref}>
      {renderMenuNodes(state, [...(rootItem?.childNodes || [])])}
    </StyledMenu>
  );
}
